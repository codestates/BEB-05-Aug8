import {
    FormControl,
    Stack,
    Button,
    Alert,
    Input,
  } from "@mui/material";
  import { useState, useEffect } from "react";
  import InputForm from "../components/inputForm.js";
  import CircularProgress from "@material-ui/core/CircularProgress";
  import SuccessMinting from "../components/SuccessMinting";
  import { NFTStorage } from "nft.storage/dist/bundle.esm.min.js";
  import erc721Abi from "../erc721Abi.js";
  import Web3 from 'web3';
  import './Create.css';

  import axios from "axios";
  const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJCYzIxRTAxYUM3RGNFMjdGYWUyQTczQjIxZUE2RjMyQmMxOWQ2NjAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MDE5NTI5NDUyNSwibmFtZSI6Ik5GVHRlc3QifQ.HCOHDRpYcqw2oLDPkR6_N1HDpc26XY_yIjmQVd8DYXc';

  function Create() {
    const baseImage =
      "https://icons-for-free.com/download-icon-file-131964752888364301_512.png";
    const [imgSrc, setImgSrc] = useState(baseImage);
    const [nftName, setNftName] = useState("");
    const [description, setDescription] = useState("");
    const [alert, setAlert] = useState(false);
    const [waitNftMinting, setWaitNftMinting] = useState(false);
    const [successMinting, setSuccessMinting] = useState(false);
    const [web3, setWeb3] = useState();

    useEffect(() => {
      if(typeof window.ethereum !== "undefined"){
        try{
          const web = new Web3(window.ethereum);
          setWeb3(web);
        } catch (err) {
          console.log(err);
        }
      }
    }, []);

    const handleImagePreview = (target) => { // blob 변환 
      const fileBlob = target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(fileBlob);
      return new Promise((resolve) => {
        reader.onload = () => {
          setImgSrc(reader.result);
          resolve();
        };
      });
    };
  
    const handleChangeNftName = (target) => {
      setNftName(target.value);
    };
  
    const handleChangeDescription = (target) => {
      setDescription(target.value);
    };
  
    async function mintNft(imageUrl) {
      // 1. metamask 연결 => accounts[0]이 연결된 account
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts[0]);

      // 1-1. ropsten network가 아니라면 전환
      const chainId = await window.ethereum.request({ method: "eth_chainId" })
      console.log("chainId: ", chainId);
      if(chainId !== '0x3'){
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{chainId: '0x3'}],
        });
      }
  
      // 2. minting
      const tokenContract = await new web3.eth.Contract(
        erc721Abi,
        '0xEef7C01b329BcEc42CfFA7fF1F318f47c16c0f7E'
      );
      try{
        const newTokenId = await tokenContract.methods.mintNFT(accounts[0], imageUrl).send({from:accounts[0]});
        console.log("Minting Success");
        return [accounts[0], newTokenId.events.Transfer.returnValues.tokenId];
      } catch(e) {
        console.error(e);
      }
    }

    const handleCreateButton = async () => {
        if (imgSrc === baseImage || nftName === "") {
            setAlert(true);
        } else {
            setAlert(false);
            try {
              setWaitNftMinting(true);
              // 1. 파일 받기
              const file = document.getElementById('nft-image').files[0];

              // 2. nft.storage에 사진 저장 후 url 받기
              const storageNft = {
                image: file,
                name: nftName,
                description: description,
              }
              const client = new NFTStorage({ token: API_KEY })
              const metadata = await client.store(storageNft)
            
              console.log(typeof(metadata));
              console.log('NFT data stored!');
              console.log('IPFS URL for the metadata:', metadata.url);
              console.log('metadata.json contents:\n', metadata.data);

              // 3. 해당 url 활용해서 민팅하기
              const jsonData = JSON.stringify(metadata.data);
              const obj = JSON.parse(jsonData);
              const replaceUrl = obj.image.replace("ipfs://","https://ipfs.io/ipfs/");
              
              const mintResult = await mintNft(replaceUrl);
              const ownerAccount = mintResult[0];
              const tokenId = mintResult[1];

              // 4. DB에 메타데이터 저장
              var data = JSON.stringify({
                "tokenId": tokenId,
                "name": obj.name,
                "imageUrl": replaceUrl,
                "description": obj.description,
                "owner": ownerAccount
              });
              
              var config = {
                method: 'post',
                url: 'http://ec2-43-200-175-29.ap-northeast-2.compute.amazonaws.com/nft-metadata',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : data
              };
              
              await axios(config)
              .then(function (response) {
                console.log(JSON.stringify(response.data));
              })
              .catch(function (error) {
                console.log(error);
              });
              
              setSuccessMinting(true);
            
            } catch (error) {
            console.log("Error: ", error);
            }
        }
    };
  
    const resetWaitNftMinting = () => {
      setImgSrc(baseImage);
      setNftName("");
      setWaitNftMinting(false);
    };
  
    const contents = [
      {
        content: "",
        id: "nft-image",
        type: "file",
        handler: handleImagePreview,
        helperText: "이미지를 선택해주세요",
      },
      {
        content: "NFT-Name",
        id: "nft-name",
        type: "text",
        handler: handleChangeNftName,
        helperText: "NFT의 이름을 입력해주세요",
      },
      {
        content: "Description",
        id: "description",
        type: "text",
        handler: handleChangeDescription,
        helperText: "간단한 설명을 입력해주세요",
      },
    ];
  
    return waitNftMinting ? (
      successMinting ? (
        <SuccessMinting reset={resetWaitNftMinting}></SuccessMinting>
      ) : (
        <Stack alignItems="center">
          <CircularProgress></CircularProgress>
          NFT 민팅 중... Please Wait...
        </Stack>
      )
    ) : (
      <Stack
        sx={{
          height: "100vh",
          maxWidth: 1200,
          width: "80%",
          mb: 5,
          mt: 2,
        }}
        margin="auto"
        alignItems="center"
        justifyContent="center"
        component="form"
      >
        <br></br>
        <div className="imgContainer">
          <img
            src={imgSrc}
            alt="preview-img"
            className="sample-img"
          />
        </div>
        <label>
          <FormControl>
            <Input
              type="file"
              id="file"
              sx={{ display: "none" }}
              onChange={(e) => {
                handleImagePreview(e.target);
              }}
            ></Input>
          </FormControl>
        </label>
  
        <Stack
          sx={{
            height: "50%",
            width: "80%",
            mb: 6,
            mt: 3,
            justifyContent: "space-around",
          }}
        >
          {contents.map((item, idx) => (
            <InputForm key={idx} item={item} />
          ))}
        </Stack>
        {alert ? (
          <Alert
            severity="error"
            onClose={() => {
              setAlert(false);
            }}
          >
            로그인, 사진, 이름은 필수입니다.
          </Alert>
        ) : (
          ""
        )}
        <Button sx={{ fontSize: 20, mt: 2 }} onClick={handleCreateButton}>
          CREATE
        </Button>
      </Stack>
        
    );
  }
  
export default Create;
  