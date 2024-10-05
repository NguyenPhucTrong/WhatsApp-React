import getPrismaInstance from "../utils/PrismaClient.js";

export const addMessage = async (req, res, next) => {
    try {
        const prisma = getPrismaInstance();
        const { message, from, to } = req.body;
        const getUser = onlineUsers.get(to);
        if (message && from && to) {
            const newMessage = await prisma.messages.create({
                data: {
                    message,
                    sender: {
                        connect: {
                            id: parseInt(from)
                        }
                    },
                    receiver: {
                        connect: {
                            id: parseInt(to)
                        }
                    },
                    messagesStatus: getUser ? "delivered" : "sent"
                },
                include: { sender: true, receiver: true },
            });
            return res.status(201).send({ message: newMessage })
        } else {
            return res.status(400).send("From, to and Message is required.")
        }
    } catch (error) {
        console.log('====================================');
        next(error)
        console.log(error);
        console.log('====================================');
    }
}

export const getMessages = async (req, res, next) => {
    try {
        const prisma = getPrismaInstance();
        const { from, to } = req.params;

        const messages = await prisma.messages.findMany({
            where: {
                OR: [
                    {
                        senderId: parseInt(from),
                        receiverId: parseInt(to),
                    },
                    {
                        senderId: parseInt(to),
                        receiverId: parseInt(from),
                    },
                ],
            },
            orderBy: {
                id: "asc",
            },
        });

        const unreadMessages = [];
        messages.forEach((message, index) => {
            if (message.messagesStatus !== "read" && message.senderId === parseInt(to)) {
                messages[index].messagesStatus = "read";
                unreadMessages.push(message.id);
                console.log("Unread Messages IDs:", unreadMessages);
            }
        });

        // Cập nhật tin nhắn chưa đọc thành "read"
        await prisma.messages.updateMany({
            where: {
                id: { in: unreadMessages },
            },
            data: {
                messagesStatus: "read",
            },
        });

        res.status(200).json({ messages });
    } catch (error) {
        next(error);
    }
};
