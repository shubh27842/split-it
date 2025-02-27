const User = require("../models/User");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, mobile } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      mobile,
    });
    // console.log("CHECK", user);
    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("Please provide an email and password");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json("Invalid credentials");
    }
	if (!user.password) {
		if (!password) {
		  return res.status(400).json({ message: "Password is required for first-time login" });
		}
		user.password = await bcrypt.hash(password, 10);
		await user.save();
	  } else {
		const isMatch = await user.matchPassword(password);
		if (!isMatch) {
		  return res.status(401).json({ message: "Invalid credentials" });
		}
	  }
    // const isMatch = await user.matchPassword(password);
    // if (!isMatch) {
    //   return res.status(401).json({ message: "Invalid credentials" });
    // }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    // console.log("ERROR", err);
    res.status(500).json({ success: false, message: err });
  }
};

exports.createMember = async (req, res) => {
	try {
	  const {name, email } = req.body;
	  if (!email) {
		return res.status(400).json({ message: "Email is required" });
	  }
	  let existingUser = await User.findOne({ email });
	  if (existingUser) {
		return res.status(400).json({ message: "User already exists" });
	  }
	  const user = new User({ name, email });
	  await user.save();
	  res.status(201).json({ message: "Member created successfully", user: { email: user.email, _id: user._id } });
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  };

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
    });
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.cookie("token", "none", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};
