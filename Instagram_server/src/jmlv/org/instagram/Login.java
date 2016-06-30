package jmlv.org.instagram;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import jmlv.org.jbuilder.JBuilder;
import jmlv.org.jdbconnection.JDBConnection;

/**
 * Servlet implementation class Login
 */
@WebServlet("/Login")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Login() {
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
		// TODO Auto-generated method stub
				System.out.println("login");
				JDBConnection w = new JDBConnection();
				PrintWriter out = response.getWriter();
				String nickname = request.getParameter("nickname");
				String password = request.getParameter("password");
				System.out.println(nickname+ " "+password );
				w.setConnection("localhost", "5432", "instagram", "postgres", "masterkey");
				Object [] params = {nickname,password};
				w.executeQueryX("SELECT COUNT(*) OVER (), c.access_token_app_user FROM app_user c WHERE c.nickname_app_user=? AND c.password_app_user=?",params);
				JBuilder json = new JBuilder();
				json.add("count",w.getTable());
				System.out.println(json.getJBuilder());
				String[] count = json.getJBuilder().split("\"");
				response.setHeader("Access-Control-Allow-Origin", "*");
				 JBuilder json2 = new JBuilder();
				if(count[5].equals("1")){
					json2.add("response","OK" );
					json2.add("token", count[9]);
					out.print(json2.getJBuilder());
				}
				else{
					json2.add("error","Invalid Userdata" );
					out.print(json2.getJBuilder());
				}
				
			}


}
