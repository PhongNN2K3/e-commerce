import Address from "../../models/Address.js";

const addAddress = async (req, res) => {
  try {
    const { userId, fullname, address, city, zipcode, phone, notes } = req.body;

    if (
      !userId ||
      !fullname ||
      !address ||
      !city ||
      !zipcode ||
      !phone ||
      !notes
    ) {
      return res.status(400).json({
        success: false,
        message: "Không được để trống ô nhập liệu!",
      });
    }

    const newlyCreatedAddress = new Address({
      userId,
      fullname,
      address,
      city,
      zipcode,
      notes,
      phone,
    });

    await newlyCreatedAddress.save();

    res.status(201).json({
      success: true,
      data: newlyCreatedAddress,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required!",
      });
    }

    const addressList = await Address.find({ userId });

    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User id và id địa chỉ là bắt buộc!",
      });
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true }
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy địa chỉ",
      });
    }

    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User id và id địa chỉ là bắt buộc!",
      });
    }

    const address = await Address.findOneAndDelete({ _id: addressId, userId });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy địa chỉ",
      });
    }

    res.status(200).json({
      success: true,
      message: "Địa chỉ đã xóa thành công",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

export { addAddress, deleteAddress, editAddress, fetchAllAddress };
