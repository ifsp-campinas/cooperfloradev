//Poss[íveis problemas https://stackoverflow.com/questions/19877246/nodemailer-with-gmail-and-nodejs

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const cors = require("cors")({
    origin: true
});

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    const snapshot = await admin.database().ref('/messages').push({original: original});
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref.toString());
});

// exports.firestoreEmail = functions.firestore
// .document('users/{userId}')
// .onCreate(event => {
//     //const userId = event.params.userId;
//     // console.log(event.params);
//     console.log(event);
//     const db=admin.firestore();
//     return db.collection('users').doc('mo7mvA7CBjT9QnYY4GWGvXTxDxG3')
//     .get()
//     .then(doc => {
//         const user = doc.data()
//         const msg = {
//             // to: user.email,
//             to: 'albordignon@gmail.com',
//             from: 'albordignon@gmail.com',
//             subject: 'Novo parceiro(a)',
//             templateId: 'd-fcc6a21e08e04d918bd5814b50a7e22b',
//             substitutionWrappers: ['{{', '}}'],
//             substitutions: {
//                 name: 'André' 
//             }
//         };
//         return sgMail.send(msg);
//     })
//     .then(() => console.log('Message sent.'))
//     .catch(err => console.log('Erro', err))
// });

exports.enviaEmailCriacaoUsuario = functions.firestore
.document('users/{userId}')
.onCreate((event, dados) => {
    console.log("Iniciando a função.");
    const userId = dados.params.userId;
    const db=admin.firestore();
    return db.collection('users').doc(userId)
    .get()
    .then(doc => {
        let userData = doc.data();
        console.log(userData);
        var sesAccessKey = 'contatocooperflora@gmail.com';
        var sesSecretKey = 'AgroecologiaAMS';
        console.log("email:", sesAccessKey);
        var transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            auth: {
                user: sesAccessKey,
                pass: sesSecretKey
            }
        }));
        let message = 'Um novo usuário foi incluído no banco de dados.';
        
        var text = `<div>
        <h4>Dados do consumidor</h4>
        <ul>
        <li>
        Name - ${userData.name || ""}
        </li>
        <li>
        Email - ${userData.email || ""}
        </li>
        <li>
        Phone - ${userData.phone || ""}
        </li>
        </ul>
        <h4>Mensagem</h4>
        <p>${message || ""}</p>
        </div>`;
        
        const mailOptions = {
            to: "albordignon@gmail.com",
            from: "contatocooperflora@gmail.com",
            subject: 'Um novo usuário foi cadastrado no banco de dados da Cooperflora',
            text: text,
            html: text
        };
        console.log("[Function] Antes de chamar sendMail");
        transporter.sendMail(mailOptions, function(error, info){
            console.log("Fim da função");
            console.log("Mensagem de erro -> ", error);
            console.log("Mensagem de info -> ", info);
            if(error){
                console.log(error.message);
            }
            console.log("Fim da função");
            console.log("mensagem enviada");
            res.status(200).send({          
                message: "success"
            })
        });
    })
    .catch(err => console.log('Erro', err));
});


exports.emailViaForm = functions.https.onRequest((req, res) => {
    console.log("Inicio da Função");
    const { name, email, phone, message } = req.body;
    console.log("[function]", name, email, phone, message);
    
    return cors(req, res, () => {
        var text = `<div>
        <h4>Information</h4>
        <ul>
        <li>
        Name - ${name || ""}
        </li>
        <li>
        Email - ${email || ""}
        </li>
        <li>
        Phone - ${phone || ""}
        </li>
        </ul>
        <h4>Message</h4>
        <p>${message || ""}</p>
        </div>`;
        var sesAccessKey = 'contatocooperflora@gmail.com';
        var sesSecretKey = 'AgroecologiaAMS';
        
        console.log("email:", sesAccessKey);
        
        var transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            auth: {
                user: sesAccessKey,
                pass: sesSecretKey
            }
        }));
        const mailOptions = {
            to: "albordignon@gmail.com",
            from: "contatocooperflora@gmail.com",
            subject: `${name} sent you a new message`,
            text: text,
            html: text
        };
        console.log("[Function] Antes de chamar sendMail");
        transporter.sendMail(mailOptions, function(error, info){
            console.log("Fim da função");
            if(error){
                console.log(error.message);
            }
            console.log("Fim da função");
            res.status(200).send({          
                message: "success"
            })
        });
    });
});


// exports.emailMessage1 = functions.firestore
// .document('users/{userId}')
// .onCreate(event => {
//     console.log("Iniciando a função.");
//     //const userId = event.params.userId;
//     // console.log(event.params);
//     console.log(event);
//     const db=admin.firestore();
//     return db.collection('users').doc('GXOw2sRCqXNeR0qr3ZOb')
//     .get()
//     .then(doc => {
//         // const user = doc.data();
//         return db.collection('users').doc('GXOw2sRCqXNeR0qr3ZOb')
//         .get()
//         .then(doc => {
//             const user = doc.data();

//             var text = user;
//             var sesAccessKey = 'contatocooperflora@gmail.com';
//             var sesSecretKey = 'AgroecologiaAMS';

//             console.log("email:", sesAccessKey);

//             var transporter = nodemailer.createTransport(smtpTransport({
//                 service: 'gmail',
//                 auth: {
//                     user: sesAccessKey,
//                     pass: sesSecretKey
//                 }
//             }));
//             const mailOptions = {
//                 to: "albordignon@gmail.com",
//                 from: "contatocooperflora@gmail.com",
//                 subject: 'sent you a new message',
//                 text: "Email from create user",
//                 html: "Email from create user"
//             };
//             console.log("[Function] Antes de chamar sendMail");
//             transporter.sendMail(mailOptions, function(error, info){
//                 console.log("Fim da função");
//                 console.log("Mensagem de erro -> ", error);
//                 console.log("Mensagem de info -> ", info);
//                 if(error){
//                     console.log(error.message);
//                 }
//                 console.log("Fim da função");
//                 console.log("mensagem enviada");
//                 res.status(200).send({          
//                     message: "success"
//                 })
//             });
//         })
//         .then(() => console.log('Message sent.'))
//         .catch(err => console.log('Erro', err));
//     });
// });