const FirstStorage = artifacts.require("FirstStorage");

contract('FirsStorage Test', () => {

    it('should set a new value.', async () => {
        const firstStorage = await FirstStorage.deployed();
        await firstStorage.setValue(5);

        const result = await firstStorage.getValue.call();

        assert (result.toNumber() === 5, 'Not equal');
    });
});