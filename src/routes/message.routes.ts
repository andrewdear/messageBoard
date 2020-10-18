import {Application, Request, Response} from "express";
import MessageController from "../controllers/message.controller";
import {IMessage} from "../models/message.model";

function formatMessage(message: IMessage) {
    return {
        screenName: message.screenName,
        message: message.message,
        createdAt: message._id.getTimestamp()
    }
}

const messageRoute = "/api/message";

export default (app: Application) => {
    app.post(messageRoute, (req: Request, res: Response) => {
        let errors: string[] = [];

        if(!req.body.screenName) errors.push("Screen Name Required");
        if(!req.body.message) errors.push("Message Required");

        if(errors.length) {
            return res.send({errors});
        }

        MessageController.createMessage({
            screenName: req.body.screenName,
            message: req.body.message,
        }).then(message => {
            return res.send(formatMessage(message));
        }).catch((err) => {
            return {error: err};
        })

    });

    app.get(messageRoute, (req: Request, res: Response) => {

        MessageController.getAllMessages().then((messages) => {
            return res.send(
                messages.map((message) => formatMessage(message))
            );
        }).catch((err) => {
            return {error: err};
        })

    });

    // If we are testing or in development add route that allows clearing of messages, could be adapted to be put behind authentication for admins with more time
    if(process.env.DEV || process.env.TEST) {
        app.delete(messageRoute, (req: Request, res: Response) => {

            MessageController.removeAllMessages().then((success) => {
                return res.send(
                    {success}
                );
            }).catch((err) => {
                return {error: err};
            })

        });
    }
}