const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const fetch = require('node-fetch');

const authController = {};
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

function toSlug(str) {
	// Chuyển hết sang chữ thường
	str = str.toLowerCase();     
	// xóa dấu
	str = str
		.normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
		.replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp
	// Thay ký tự đĐ
	str = str.replace(/[đĐ]/g, 'd');
	// Xóa ký tự đặc biệt
	str = str.replace(/([^0-9a-z-\s])/g, '');
	// Xóa khoảng trắng thay bằng ký tự -
	str = str.replace(/(\s+)/g, '-');
	// Xóa ký tự - liên tiếp
	str = str.replace(/-+/g, '-');
	// xóa phần dư - ở đầu & cuối
	str = str.replace(/^-+|-+$/g, '');
	return str;
}

authController.loginWithGoogle = catchAsync(async (req, res, next) => {
  const {idToken} = req.body
  console.log("idToken", idToken)
  const ticket = await client.verifyIdToken({
    idToken: idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
    });
  console.log("ticket", ticket)
  const {email,name, picture, sub} = ticket.getPayload()
  let user = await User.findOrCreate(
    { email, 
      name,
      googleId: sub,
      avatarUrl:picture,
      displayName: toSlug(name) //Tân Võ => tan-vo
    }) 
  const accessToken = await user.generateToken()

  return sendResponse(
    res,
    200,
    true,
    { user, accessToken },
    null,
    "Login successful"
  );
});

authController.loginWithFacebook = catchAsync(async (req, res, next) => {
  const {userId, access_token} = req.body
  console.log("userId", userId, access_token)
  let graphUrl = `https://graph.facebook.com/v2.11/${userId}?fields=id,email,name,picture&access_token=${access_token}`

  const response = await fetch(graphUrl,{
    method:"GET"
  })
  const data = await response.json()
  console.log("response", data)

  const {id, email, name, picture:{data:{url}}} = data

  let user = await User.findOrCreate(
    { email, 
      name,
      facebookId: id,
      avatarUrl: url,
      displayName: toSlug(name)
    }) 
  const accessToken = await user.generateToken()

  return sendResponse(
    res,
    200,
    true,
    { user, accessToken },
    null,
    "Login successful"
  );
});

authController.loginWithEmail = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return next(new AppError(400, "Invalid credentials", "Login Error"));

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new AppError(400, "Wrong password", "Login Error"));

  accessToken = await user.generateToken();
  return sendResponse(
    res,
    200,
    true,
    { user, accessToken },
    null,
    "Login successful"
  );
});




module.exports = authController;


// {
//   body: "this is tan-vo post",
//   comments:[
//     {
//     "_id": "61a7bb4674be7850bd7c98a5",
//     "body": "comment 1",
//     "reactions": [],
//     "owner": {
//           "_id":  "61a5fd6a95f05b2292e0fed8",
//           "name": "Tân Võ",
//           "avatarUrl": "https://lh3.googleusercontent.com/a-/AOh14GgsjS5mXKSznO-KBwvYdaC83HOa4ouCZdpQHIZO=s96-c",
//           "googleId": "112446137677449574388",
//           "facebookId": "",
//           "email": "tan.vopm@gmail.com",
//           "password": "$2a$10$49rCIbotraOA6GjIWY1w6uTPRlumZBifVHiaHel8lVKXsg8qrSup2",
//           "displayName": "tan-vo",
//         },
//     "post":  "61a7bb2a74be7850bd7c9897",
// },
//      "61a7bbea74be7850bd7c98b4",
//      "61a7bd4a74be7850bd7c98d8",
//      "61a83b97d01de45ac0a44d8a",
//      "61a83be3d01de45ac0a44dac",
//      "61a83c16d01de45ac0a44dca",
//      "61a83c2ad01de45ac0a44dd4"
//     ],
//   createdAt: "2021-12-01T18:12:58.083Z",
//   imageUrl: "https://i.picsum.photos/id/244/600/600.jpg?hmac=OeAzRT1ePNH0wsvaO680ILDE0pSs4gc0l9phxsXicnc",
//   owner: "61a5fd6a95f05b2292e0fed8",
//   reactions: [],
//   updatedAt: "2021-12-02T03:23:22.644Z",
//   __v: 7,
//   _id: "61a7bb2a74be7850bd7c9897"
// }

// const post = await Post.findById("abcde").populate({path:"comments", populate:"owner"})





