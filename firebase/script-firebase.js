if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register(basePath + 'firebase-messaging-sw.js')
        .then(function (registration) {
            // Initialize the Firebase app by passing in the messagingSenderId
            var config = {
                apiKey: "apikey",
                authDomain: "dominio firebase proyecto",
                databaseURL: "url firebase proyecto",
                projectId: "id",
                storageBucket: "storage",
                messagingSenderId: "id sender",
                appId: "id"
            };
            firebase.initializeApp(config);
            const messaging = firebase.messaging();
            messaging.useServiceWorker(registration);
            console.log('ServiceWorker registration fireabase succesufull with scope: ', registration.scope);
            // Request for permission
            messaging.requestPermission()
                .then(function () {
                    console.log('Notification permiso concedido.');
                    // TODO(developer): Retrieve an Instance ID token for use with FCM.
                    messaging.getToken()
                        .then(function (currentToken) {
                            if (currentToken) {
                                console.log('Token: ' + currentToken);
                                // codigo que tiene qe ejecutarse si me generan un token 
                            } else {
                                console.log('respondio con un token vacio. necesita permiso para generar uno.');
                            }
                        })
                        .catch(function (err) {
                            console.log('Ocurrio un error al solicitar el token. ', err);
                        });
                })
                .catch(function (err) {
                    console.log('no se pudo conseguir el permiso para notificar.', err);
                });

            // Handle incoming messages
            messaging.onMessage(function (payload) {
                console.log("Notification recibida: ", payload);
                const Title = payload.data.title;
                const options = {
                    body: payload.data.body,
                    badge: '/Content/assets/images/logo32.png',
                    icon: '/Content/assets/images/logo-white-small.png',
                    click_action: payload.data.click_action,
                    vibrate: [100, 50, 100],

                };
                registration.showNotification(Title, options);
            });

            // Callback fired if Instance ID token is updated.
            messaging.onTokenRefresh(function () {
                messaging.getToken()
                    .then(function (refreshedToken) {
                        console.log('Token actualizado.');
                        
                        // si se refresca que hacer con el nuevo token
                        

                    })
                    .catch(function (err) {
                        console.log('no se pudo conseguir actualizar el token ', err);
                    });
            });
        });

} else console.log('Tu navegador no soporta the Service-Worker!');





