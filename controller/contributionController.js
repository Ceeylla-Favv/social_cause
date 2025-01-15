const Contribution = require("../model/Contribution");

const contributeToCause = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, amount } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a valid number greater than 0" });
    }

    const contribution = new Contribution({
      causeId: id,
      name,
      email,
      amount: parseFloat(amount),
    });

    await contribution.save();

    return res.status(201).json(contribution);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = contributeToCause;
