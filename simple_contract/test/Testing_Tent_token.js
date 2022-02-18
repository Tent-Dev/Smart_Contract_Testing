const TentToken = artifacts.require("Tent_Token");

contract("Tent_Token testing", async accounts => {
  it("should put 100,000,000 Tent_Token in the first account", async () => {
    const tokenDeployed = await TentToken.deployed();
    const balance = await tokenDeployed.balanceOf.call(accounts[0]);
    const checkAmount = web3.utils.toWei('100000000', 'ether');
    assert.equal(balance.valueOf(), checkAmount);
  });

  it("should send coin correctly", async () => {
    // Get initial balances of first and second account.
    const account_one = accounts[0];
    const account_two = accounts[1];
    const amount = web3.utils.toWei('10', 'ether');; //amount of token want to send
    const tokenDeployed = await TentToken.deployed();

    console.log('Send '+ amount + ' Token (convert from wei is: ' + web3.utils.fromWei(amount, "ether") + ' Token)');

    //Before transfer
    let balance = await tokenDeployed.balanceOf.call(account_one);
    const account_one_starting_balance = Number(balance);
    console.log('Sender Balance before transfer: '+ account_one_starting_balance);

    balance = await tokenDeployed.balanceOf.call(account_two);
    const account_two_starting_balance = Number(balance);
    console.log('Receiver Balance before transfer: '+ account_two_starting_balance);

    //Transfer
    await tokenDeployed.transfer(account_two, amount, { from: account_one });
    

    //After transfer
    balance = await tokenDeployed.balanceOf.call(account_one);
    const account_one_ending_balance = Number(balance);
    console.log('Sender Balance after transfer: '+ account_one_ending_balance);

    balance = await tokenDeployed.balanceOf.call(account_two);
    const account_two_ending_balance = Number(balance);
    console.log('Receiver Balance after transfer: '+ account_two_ending_balance);

    //check before & after balance
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