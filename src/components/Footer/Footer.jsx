import styles from './styles.module.scss';
function Footer() {
  const { container } = styles;
  return (
    <div className={container}>
      <p>�� 2023 All rights reserved. Designed by ThemeXstore.</p>
      <p>Contact: 0987654321</p>
      <p>Email: info@themexstore.com</p>
      <p>Address: 123 Main St, City, State, Zip</p>
      <p>Follow us on social media:</p>
      <div>
        <img src='https://example.com/facebook.png' alt='facebook' />
        <img src='https://example.com/twitter.png' alt='twitter' />
        <img src='https://example.com/instagram.png' alt='instagram' />
      </div>
      <p>Terms & Conditions | Privacy Policy</p>
      <p>�� 2023 ThemeXstore. All rights reserved.</p>
    </div>
  );
}

export default Footer;
