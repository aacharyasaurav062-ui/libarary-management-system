import javax.swing.*;

public class loginform {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Library Login");

        JLabel userLabel = new JLabel("Username:");
        userLabel.setBounds(50, 50, 100, 30);

        JTextField userText = new JTextField();
        userText.setBounds(150, 50, 150, 30);

        JLabel passLabel = new JLabel("Password:");
        passLabel.setBounds(50, 100, 100, 30);

        JPasswordField passText = new JPasswordField();
        passText.setBounds(150, 100, 150, 30);

        JButton loginBtn = new JButton("Login");
        loginBtn.setBounds(120, 160, 100, 30);

        frame.add(userLabel);
        frame.add(userText);
        frame.add(passLabel);
        frame.add(passText);  
        frame.add(loginBtn);

        frame.setSize(400, 300);
        frame.setLayout(null);
        frame.setVisible(true);
    }
}