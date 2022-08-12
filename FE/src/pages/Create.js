import {
    FormControl,
    Stack,
    Button,
    Alert,
    Input,
  } from "@mui/material";
  import { useState } from "react";
  import InputForm from "../components/inputForm.js";
  import CircularProgress from "@material-ui/core/CircularProgress";
  import SuccessMinting from "../components/SuccessMinting";
  import { NFTStorage } from "nft.storage/dist/bundle.esm.min.js";
  import axios from "axios";
  const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEJCYzIxRTAxYUM3RGNFMjdGYWUyQTczQjIxZUE2RjMyQmMxOWQ2NjAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MDE5NTI5NDUyNSwibmFtZSI6Ik5GVHRlc3QifQ.HCOHDRpYcqw2oLDPkR6_N1HDpc26XY_yIjmQVd8DYXc'

  
  function Create({ account, web3, caver }) {
    const baseImage =
      "https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118928_960_720.png";
    const [imgSrc, setImgSrc] = useState(baseImage);
    const [nftName, setNftName] = useState("");
    const [description, setDescription] = useState("");
    const [alert, setAlert] = useState(false);
    const [waitNftMinting, setWaitNftMinting] = useState(false);
    const [successMinting, setSuccessMinting] = useState(false);

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
  
    const handleCreateButton = async () => {
        if (account === "" || imgSrc === baseImage || nftName === "") {
            setAlert(true);
        } else {
            setAlert(false);
            try {
            const file = document.getElementById('nft-image').files[0];
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

            const jsonData = JSON.stringify(metadata.data);
            const obj = JSON.parse(jsonData);
            const replaceUrl = obj.image.replace("ipfs://","https://ipfs.io/ipfs/");

            var data = JSON.stringify({
              "tokenId": "1",
              "name": obj.name,
              "imageUrl": replaceUrl,
              "description": obj.description
            });
            
            var config = {
              method: 'post',
              url: 'http://ec2-43-200-175-29.ap-northeast-2.compute.amazonaws.com/nft-metadata',
              headers: { 
                'Content-Type': 'application/json'
              },
              data : data
            };
            
            axios(config)
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
        <label>
          <FormControl>
            <img
              src={imgSrc}
              alt="preview-img"
              style={{ height: 200, width: 200 }}
            />
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
  