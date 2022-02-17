const TentToken = artifacts.require("Tent_Token");

contract("Tent_Token testing", async accounts => {
  it("should put 100,000,000 Tent_Token in the first account", async () => {
    const instance = await TentToken.deployed();
    const balance = await instance.balanceOf.call(accounts[0]);
    const checkAmount = web3.utils.toWei('100000000', 'ether');
    assert.equal(balance.valueOf(), checkAmount);
  });

  it("should send coin correctly", async () => {
    // Get initial balances of first and second account.
    const account_one = accounts[0];
    const account_two = accounts[1];

    const amount = 10;

    const instance = await TentToken.deployed();
    const meta = instance;

    const balance = await meta.balanceOf.call(account_one);
    const account_one_starting_balance = balance.toNumber();

    balance = await meta.balanceOf.call(account_two);
    const account_two_starting_balance = balance.toNumber();
    await meta.sendCoin(account_two, amount, { from: account_one });

    balance = await meta.balanceOf.call(account_one);
    const account_one_ending_balance = balance.toNumber();

    balance = await meta.balanceOf.call(account_two);
    const account_two_ending_balance = balance.toNumber();

    assert.equal(
      account_one_ending_balance,
      account_one_starting_balance - amount,
      "Amount wasn't correctly taken from the sender"
    );
    assert.equal(
      account_two_ending_balance,
      account_two_starting_balance + amount,
      "Amount wasn't correctly sent to the receiver"
    );
  });
});