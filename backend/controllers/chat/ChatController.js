const {
    responseReturn
} = require('../../utils/response');
const {
    sellerModel,
    customerModel,
    sellerCustomerModel,
    sellerCustomerMessage,
    adminSellerMessage
} = require('../../models');

class ChatController {
    // Add a customer as a friend to the seller or vice versa
    addCustomerFriend = async (req, res) => {
        const {
            sellerId,
            userId
        } = req.body;

        try {
            if (sellerId !== '') {
                const [seller, user, checkSeller, checkCustomer] = await Promise.all([
                    sellerModel.findById(sellerId),
                    customerModel.findById(userId),
                    sellerCustomerModel.findOne({
                        myId: userId,
                        'myFriends.fdId': sellerId
                    }),
                    sellerCustomerModel.findOne({
                        myId: sellerId,
                        'myFriends.fdId': userId
                    })
                ]);

                if (!checkSeller) {
                    await sellerCustomerModel.updateOne({
                        myId: userId
                    }, {
                        $push: {
                            myFriends: {
                                fdId: sellerId,
                                name: seller.shopInfo?.shopName,
                                image: seller.image
                            }
                        }
                    });
                }

                if (!checkCustomer) {
                    await sellerCustomerModel.updateOne({
                        myId: sellerId
                    }, {
                        $push: {
                            myFriends: {
                                fdId: userId,
                                name: user.name,
                                image: ""
                            }
                        }
                    });
                }

                const messages = await sellerCustomerMessage.find({
                    $or: [{
                            receverId: sellerId,
                            senderId: userId
                        },
                        {
                            receverId: userId,
                            senderId: sellerId
                        }
                    ]
                });

                const myFriends = (await sellerCustomerModel.findOne({
                    myId: userId
                })).myFriends;

                const currentFd = myFriends.find(s => s.fdId === sellerId);

                responseReturn(res, 200, {
                    myFriends,
                    currentFd,
                    messages
                });
            } else {
                const myFriends = (await sellerCustomerModel.findOne({
                    myId: userId
                })).myFriends;

                responseReturn(res, 200, {
                    myFriends
                });
            }
        } catch (error) {
            console.error(error);
            responseReturn(res, 500, {
                error: 'Internal Server Error'
            });
        }
    }

    // Add a message from a customer to a seller
    customerMessageAdd = async (req, res) => {
        const {
            userId,
            text,
            sellerId,
            name
        } = req.body;

        try {
            const message = await sellerCustomerMessage.create({
                senderId: userId,
                senderName: name,
                receverId: sellerId,
                message: text
            });

            const updateFriends = async (id, fdId, myFriends) => {
                const index = myFriends.findIndex(f => f.fdId === fdId);
                while (index > 0) {
                    [myFriends[index], myFriends[index - 1]] = [myFriends[index - 1], myFriends[index]];
                    index--;
                }
                await sellerCustomerModel.updateOne({
                    myId: id
                }, {
                    myFriends
                });
            };

            const [data, data1] = await Promise.all([
                sellerCustomerModel.findOne({
                    myId: userId
                }),
                sellerCustomerModel.findOne({
                    myId: sellerId
                })
            ]);

            await Promise.all([
                updateFriends(userId, sellerId, data.myFriends),
                updateFriends(sellerId, userId, data1.myFriends)
            ]);

            responseReturn(res, 201, {
                message
            });
        } catch (error) {
            console.error(error);
            responseReturn(res, 500, {
                error: 'Internal Server Error'
            });
        }
    }

    // Get customers associated with a seller
    getCustomers = async (req, res) => {
        const {
            sellerId
        } = req.params;

        try {
            const data = await sellerCustomerModel.findOne({
                myId: sellerId
            });

            responseReturn(res, 200, {
                customers: data.myFriends
            });
        } catch (error) {
            console.error(error);
            responseReturn(res, 500, {
                error: 'Internal Server Error'
            });
        }
    }

    // Get messages between a customer and a seller
    getCustomerSellerMessage = async (req, res) => {
        const {
            customerId
        } = req.params;
        const {
            id
        } = req;

        try {
            const messages = await sellerCustomerMessage.find({
                $or: [{
                        receverId: customerId,
                        senderId: id
                    },
                    {
                        receverId: id,
                        senderId: customerId
                    }
                ]
            });
            const currentCustomer = await customerModel.findById(customerId);

            responseReturn(res, 200, {
                messages,
                currentCustomer
            });
        } catch (error) {
            console.error(error);
            responseReturn(res, 500, {
                error: 'Internal Server Error'
            });
        }
    }

    // Add a message from a seller to a customer
    sellerMessageAdd = async (req, res) => {
        const {
            senderId,
            text,
            receverId,
            name
        } = req.body;

        try {
            const message = await sellerCustomerMessage.create({
                senderId,
                senderName: name,
                receverId,
                message: text
            });

            const updateFriends = async (id, fdId, myFriends) => {
                const index = myFriends.findIndex(f => f.fdId === fdId);
                while (index > 0) {
                    [myFriends[index], myFriends[index - 1]] = [myFriends[index - 1], myFriends[index]];
                    index--;
                }
                await sellerCustomerModel.updateOne({
                    myId: id
                }, {
                    myFriends
                });
            };

            const [data, data1] = await Promise.all([
                sellerCustomerModel.findOne({
                    myId: senderId
                }),
                sellerCustomerModel.findOne({
                    myId: receverId
                })
            ]);

            await Promise.all([
                updateFriends(senderId, receverId, data.myFriends),
                updateFriends(receverId, senderId, data1.myFriends)
            ]);

            responseReturn(res, 201, {
                message
            });
        } catch (error) {
            console.error(error);
            responseReturn(res, 500, {
                error: 'Internal Server Error'
            });
        }
    }

    // Get all sellers
    getSellers = async (req, res) => {
        try {
            const sellers = await sellerModel.find({});
            responseReturn(res, 200, {
                sellers
            });
        } catch (error) {
            console.error(error);
            responseReturn(res, 500, {
                error: 'Internal Server Error'
            });
        }
    }

    // Insert a message from a seller to an admin
    sellerAdminMessageInsert = async (req, res) => {
        const {
            senderId,
            receverId,
            message,
            senderName
        } = req.body;

        try {
            const messageData = await adminSellerMessage.create({
                senderId,
                receverId,
                senderName,
                message
            });

            responseReturn(res, 200, {
                message: messageData
            });
        } catch (error) {
            console.error(error);
            responseReturn(res, 500, {
                error: 'Internal Server Error'
            });
        }
    }

    // Get messages between an admin and a seller
    getAdminMessages = async (req, res) => {
        const {
            receverId
        } = req.params;
        const id = '';

        try {
            const messages = await adminSellerMessage.find({
                $or: [{
                        receverId,
                        senderId: id
                    },
                    {
                        receverId: id,
                        senderId: receverId
                    }
                ]
            });

            let currentSeller = {};
            if (receverId) {
                currentSeller = await sellerModel.findById(receverId);
            }

            responseReturn(res, 200, {
                messages,
                currentSeller
            });
        } catch (error) {
            console.error(error);
            responseReturn(res, 500, {
                error: 'Internal Server Error'
            });
        }
    }

    // Get messages between a seller and an admin
    getSellerMessages = async (req, res) => {
        const receverId = '';
        const {
            id
        } = req;

        try {
            const messages = await adminSellerMessage.find({
                $or: [{
                        receverId,
                        senderId: id
                    },
                    {
                        receverId: id,
                        senderId: receverId
                    }
                ]
            });

            responseReturn(res, 200, {
                messages
            });
        } catch (error) {
            console.error(error);
            responseReturn(res, 500, {
                error: 'Internal Server Error'
            });
        }
    }
}

module.exports = new ChatController();
