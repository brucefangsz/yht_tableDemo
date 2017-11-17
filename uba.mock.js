module.exports = {
  "GET": [{
    "/userInfo/:id": "./mock/api/user/userinfo.json",
  }, {
    "/apptenant/app/pageTenantRes": "./mock/web/getCloudStateList.json"
  }],
  "POST": [
    {
      "/apptenant/web/u8c/active": "./mock/web/u8c/active.json"
    }
  ]
}
