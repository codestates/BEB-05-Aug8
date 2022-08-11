const { query } = require('express');
const db = require('../db');

// firebase에 연결해서 데이터 받아오기
module.exports = {
  items: {
    get: (callback) => {
      const queryString = `SELECT * FROM items`;

      db.query(queryString, (error, result) => {
        callback(error, result);
      });
    },
  },
  orders: {
    get: (userId, callback) => {
      const queryString = 
      `
      select o.id, o.created_at, o.total_price, i.name, i.price, i.image, oi.order_quantity
      from items i
      join order_items oi
      on oi.item_id = i.id
      join orders o
      on o.id = oi.order_id
      where o.user_id = ?;
      `
      const params = userId;

      db.query(queryString, params, (error, result) => {
        callback(error, result);
      })
    },
    post: (userId, orders, totalPrice, callback) => {
      // TODO: 해당 유저의 주문 요청을 데이터베이스에 생성하는 함수를 작성하세요

      // orders에 레코드 추가
      const queryString = 
      `
      insert into orders(user_id, total_price)
      values(?, ?);
      `
      const params = [userId, totalPrice];
      let order_id;
      db.query(queryString, params, (error, result) => {
        if(error){
          return callback(error, null);
        }
  
        // order_items에 레코드 추가
        const queryString2 =
        `
        insert into order_items(order_id, item_id, order_quantity)
        values ?
        `
        const values = orders.map(item => [result.insertId, item.itemId, item.quantity]);
        db.query(queryString2, [values], callback);
      })
    }
  },
};
