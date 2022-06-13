import React, { Component } from "react";

export class Welcome extends Component {
    render() {
        return (
            <div>
                <footer id="footer-1" class="pt60 pb50">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-4">
                                <h4>About Purefive</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam molestie, tellus id pellentesque feugiat, sem sem cursus orci, a placerat ante ante nec massa.</p>
                                <p><a href="http://themeforest.net/user/vossendesign/portfolio" target="_blank">© 2015 Purefive · </a>Made with <i class="ion-heart highlight"></i> for great people.</p>
                            </div>
                            <div class="col-md-4">
                                <h4>Follow us</h4>
                                <ul class="footer-1-social">
                                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                                    <li><a href="#"><i class="fa fa-behance"></i></a></li>
                                    <li><a href="#"><i class="fa fa-dribbble"></i></a></li>
                                    <li><a href="#"><i class="fa fa-flickr"></i></a></li>
                                    <li><a href="#"><i class="fa fa-instagram"></i></a></li>
                                    <li><a href="#"><i class="fa fa-google-plus-square"></i></a></li>
                                    <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                                    <li><a href="#"><i class="fa fa-dropbox"></i></a></li>
                                    <li><a href="#"><i class="fa fa-pinterest-p"></i></a></li>
                                    <li><a href="#"><i class="fa fa-tumblr-square"></i></a></li>
                                    <li><a href="#"><i class="fa fa-youtube"></i></a></li>
                                    <li><a href="#"><i class="fa fa-vk"></i></a></li>
                                    <li><a href="#"><i class="fa fa-vine"></i></a></li>
                                    <li><a href="#"><i class="fa fa-spotify"></i></a></li>
                                    <li><a href="#"><i class="fa fa-skype"></i></a></li>
                                    <li><a href="#"><i class="fa fa-reddit"></i></a></li>
                                    <li><a href="#"><i class="fa fa-tripadvisor"></i></a></li>
                                </ul>
                            </div>
                            <div class="col-md-4">
                                <div class="subscription">
                                    <h4>Newsletter</h4>

                                    <form action="php/subscribe-mailchimp.php" method="post" id="subscribe-form" role="form">
                                        <div class="form-validation alert"></div>
                                        <div class="form-group subscribe-form-input">
                                            <input type="email" name="email" id="subscribe-form-email" class="footer-subscribe-input" placeholder="Enter your email to subscribe *" autocomplete="off" />
                                        </div>
                                    </form>
                                    <p class="subscribe-info"><i class="ion-information-circled"></i> We will never send you spam or share your email with third parties</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
                <a id="back-to-top"><i class="icon ion-chevron-up"></i></a>
            </div>
        )
    }
}

export default Welcome;