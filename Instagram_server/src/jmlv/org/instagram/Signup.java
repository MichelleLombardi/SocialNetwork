package jmlv.org.instagram;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import jmlv.org.jbuilder.JBuilder;
import jmlv.org.jdbconnection.JDBConnection;

/**
 * Servlet implementation class Signup
 */
@WebServlet("/Signup")
public class Signup extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Signup() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
			JDBConnection w = new JDBConnection();
			w.setConnection("localhost", "5432", "instagram", "postgres", "masterkey");
			String firstname = request.getParameter("firstName");
			String lastname = request.getParameter("lastName");
			String password = request.getParameter("pass");
			String nickname = request.getParameter("nickname");
			w.executeQueryX("SELECT COUNT(*) FROM app_user WHERE nickname_app_user=?",nickname);
			JBuilder json = new JBuilder();
			json.add("count",w.getTable());
			String[] count = json.getJBuilder().split("\"");
			response.setHeader("Access-Control-Allow-Origin", "*");
			 JBuilder json2 = new JBuilder();
			 StringBuffer hexString = new StringBuffer();
			 String nickname2 = nickname;
			if(count[5].equals("0")){
				MessageDigest mdAlgorithm;
				try {
					mdAlgorithm = MessageDigest.getInstance("MD5");
					mdAlgorithm.update(nickname2.getBytes());

					byte[] digest = mdAlgorithm.digest();
					

					for (int i = 0; i < digest.length; i++) {
					    nickname2 = Integer.toHexString(0xFF & digest[i]);

					    if (nickname2.length() < 2) {
					        nickname2 = "0" + nickname2;
					    }

					    hexString.append(nickname2);
					}
					json2.add("token", hexString.toString());
				} catch (NoSuchAlgorithmException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				String email = request.getParameter("email");
				Object [] params = {firstname,lastname,email,nickname,password,hexString.toString()};
				w.execute("insert into app_user (name_app_user,lastname_app_user,email_app_user,nickname_app_user,password_app_user,access_token_app_user) values(?,?,?,?,?,?)",params);
		        out = response.getWriter();
				json2.add("firstname",firstname);
				json2.add("lastname",lastname);
				json2.add("nickname",nickname);
				json2.add("password",password);
				json2.add("email",email);
				System.out.println("post:"+json2.getJBuilder());
				out.print(json2.getJBuilder());
				File file = new File("/Users/joselopez/Documents/workspace/Instagram_server/WebContent/Media/"+nickname);
		        if (!file.exists()) {
		            if (file.mkdir()) {
		                System.out.println("Directory is created!");
		            } else {
		                System.out.println("Failed to create directory!");
		            }
		        }

				w.close();
			}else{
				out = response.getWriter();
				json2.add("error","Nickname already exists");
				out.print(json2.getJBuilder());
			}
		w.close();
	}

}

