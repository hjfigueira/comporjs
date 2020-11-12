/** EXAMPLE ONLY, OTHER LIBS ARE NOT AVAILABLE HERE **/

import {e,BasePage,block} from "../core/helpers";
import {FirebaseLoginService} from "../services/firebase/firebaseLoginService";
import {Exception} from "../exceptions/exception";

export class LoginPage extends BasePage{

    onInit()
    {
        this.firebaseLogin = this.app.service(FirebaseLoginService);
    }

    onBeforeRender()
    {
        return this.firebaseLogin
            .isUserLoggedIn()
            .then( (status) => {
                if(status) {
                    console.log('already logged in');
                    window.location.hash = '/main';
                    return Promise.reject(new Exception(403,'user already logged in'));
                }
            });
    }

    onRender()
    {
        this.styles = './css/loginPage.css';

        this.template = block( (e) =>
            e('div.container-fluid',
                e('div.row',
                    e('div.col-md-12',
                        e('div#main-image',
                            e('img.image').attr('src', './img/logo.jpg'),
                        ),
                        e('h1.title').text('Title'),
                        show( false, () => e('small.subtitle').text('Subtitle') )
                    )
                ),
                repeat ( [1,2,3] , (item) =>
                    e('div.row',
                        e('div.col-md-12',
                            e('button.btn.btn-primary.btn-lg.btn-block', ['Login com Facebook']),
                            e('button.btn.btn-primary.btn-lg.btn-block', ['Login com Google'])
                        )
                    ),
                () =>
                    e('div.row',
                        e('div.row',[ 'No results to show' ])
                    )
                )
            )
        );

        this.template.ref('btnFacebook').el.addEventListener('click', this.loginFacebook.bind(this));
        this.template.ref('btnGoogle').el.addEventListener('click', this.loginGoogle.bind(this));
        return this.template.el;
    }

    loginFacebook()
    {
        this.firebaseLogin
            .facebookLogin()
            .then( () => {
                return this.firebaseLogin.isUserLoggedIn();
            })
            .then( (status) => {
                if(status){
                    window.location.hash = '/main';
                }
            })
            .catch(console.error)
    }

    loginGoogle()
    {
        this.firebaseLogin
            .googleLogin()
            .then( () => {
                return this.firebaseLogin.isUserLoggedIn();
            })
            .then( (status) => {
                if(status){
                    window.location.hash = '/main';
                }
            })
            .catch(console.error)

    }

}