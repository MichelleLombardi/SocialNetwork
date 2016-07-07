package jmlv.org.instagram;

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
 * Servlet implementation class Get_Publishes
 */
@WebServlet("/get_publishes")
public class Get_Publishes extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Get_Publishes() {
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
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "*");
		PrintWriter out = response.getWriter();
        	JDBConnection w = new JDBConnection();
    		w.setConnection("localhost", "5432", "instagram", "postgres", "masterkey");
        String param = request.getParameter("type");
        System.out.println(param);
    	if(param.equals("1")){
    		w.executeQuery("SELECT publish.title_publish, publish.id_publish, publish.media_publish, publish.media_type_publish, publish.description_publish, publish.location_publish, publish.tag_publish, app_user.nickname_app_user FROM publish INNER JOIN app_user ON (publish.id_app_user = app_user.id_app_user)");
        }
        if(param.equals("2")){
        	w.executeQuery("SELECT media.id_media, media.likes_media, media.views_media, media.created_at, media.url_media, media.name_media, media.category_media, media.description_media, app_user.username FROM user_media INNER JOIN media ON (user_media.id_media = media.id_media) INNER JOIN app_user ON (user_media.id_user = app_user.id_user) ORDER BY views_media DESC LIMIT 10");
        }
        if(param.equals("3")){
        	w.executeQuery("SELECT media.id_media, media.likes_media, media.views_media, media.created_at, media.url_media, media.name_media, media.category_media, media.description_media, app_user.username FROM user_media INNER JOIN media ON (user_media.id_media = media.id_media) INNER JOIN app_user ON (user_media.id_user = app_user.id_user) WHERE category_media='1'");
        }
        if(param.equals("4")){
        	w.executeQuery("SELECT media.id_media, media.likes_media, media.views_media, media.created_at, media.url_media, media.name_media, media.category_media, media.description_media, app_user.username FROM user_media INNER JOIN media ON (user_media.id_media = media.id_media) INNER JOIN app_user ON (user_media.id_user = app_user.id_user) WHERE category_media='2'");
        }
        if(param.equals("5")){
        	w.executeQuery("SELECT media.id_media, media.likes_media, media.views_media, media.created_at, media.url_media, media.name_media, media.category_media, media.description_media, app_user.username FROM user_media INNER JOIN media ON (user_media.id_media = media.id_media) INNER JOIN app_user ON (user_media.id_user = app_user.id_user) WHERE category_media='3'");
        }
        if(param.equals("6")){
        	w.executeQuery("SELECT media.id_media, media.likes_media, media.views_media, media.created_at, media.url_media, media.name_media, media.category_media, media.description_media, app_user.username FROM user_media INNER JOIN media ON (user_media.id_media = media.id_media) INNER JOIN app_user ON (user_media.id_user = app_user.id_user) WHERE category_media='4'");
        }
        if(param.equals("7")){
        	w.executeQuery("SELECT media.id_media, media.likes_media, media.views_media, media.created_at, media.url_media, media.name_media, media.category_media, media.description_media, app_user.username FROM user_media INNER JOIN media ON (user_media.id_media = media.id_media) INNER JOIN app_user ON (user_media.id_user = app_user.id_user) WHERE category_media='5'");
        }
		out = response.getWriter();
        JBuilder json = new JBuilder();
        json.add("publishes", w.getTable());
		out.print(json.getJBuilder());
		w.close();
	}

}
