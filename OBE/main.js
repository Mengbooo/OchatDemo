import express from 'express';
import cors from 'cors';
const app = express();
const port = 5577;

app.use(cors());
// 解析数据
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);

})

// app.get('/hello', (req, res) => {
//     res.send('Hello World!');
// })

const messageList = [];

app.post('/message/send', (req, res) => {
    const { username, message } = req.body;
    messageList.push({ username, message });
    res.json({
        statusbar: 200,
        msg: 'DONE',
    });
});

app.get('/message', async (req, res) => {
    res.json(messageList)
})