package jmlv.org.instagram;

import java.io.IOException;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;

import jmlv.org.jbuilder.JBuilder;
import jmlv.org.jdbconnection.JDBConnection;

/**
 * Servlet implementation class Upload
 */
@MultipartConfig
@WebServlet("/upload")
public class Upload extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Upload() {
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
		{
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.setHeader("Access-Control-Allow-Methods", "*");
			// TODO Auto-generated method stub
					Part file = request.getPart("file");
					
					InputStream filecontent = file.getInputStream();
					OutputStream os = null;
					String url = null;
					String nickname = request.getParameter("nick");
					try {
						String path = "/Users/joselopez/Documents/workspace/Instagram_server/WebContent/Media/"+nickname;
						System.out.println(path);
						url = path + "/" + this.getFileName(file).replace(" ", "");
						System.out.println(url);
						os = new FileOutputStream(url);
			            int read = 0;
			            byte[] bytes = new byte[1024];
			            while ((read = filecontent.read(bytes)) != -1) {
			                os.write(bytes, 0, read);
			            }
	
			        } catch (Exception e) {
			            e.printStackTrace();
			        } finally {
			            if (filecontent != null) {
			                filecontent.close();
			            }
			            if (os != null) {
			                os.close();
			            }
			            java.util.Date parsed;
				        java.sql.Date sql = null;
			            Calendar cal = Calendar.getInstance();
						String time = new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime());
						try {
							parsed = new SimpleDateFormat("yyyy-MM-dd").parse(time);
							sql = new java.sql.Date(parsed.getTime());
						} catch (ParseException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}	
			            Integer id = Integer.parseInt(request.getParameter("id"));
			            String nick = request.getParameter("nick");
			            String tags = request.getParameter("tags");
			            String type = request.getParameter("type");
			            String desc = request.getParameter("desc");
			            String locat = request.getParameter("locat");
			            JDBConnection w = new JDBConnection(); 
			            String [] newurl = url.split("/");
//			            url= "";
//			            for(int i =5; i<newurl.length;i++){
//			            	if(i!=6){
//			            		url = url + "/"+newurl[i].replace(" ", "");
//			            		System.out.println(url);
//			            	}
//			            }
			            
			            
						w.setConnection("localhost", "5432", "instagram", "postgres", "masterkey");
						Object [] params = {this.getFileName(file),url,type,desc,locat,sql,id,tags};
						w.execute("INSERT INTO publish (title_publish,media_publish,media_type_publish,description_publish,location_publish,date_time_publish,id_app_user,tag_publish) VALUES(?,?,?,?,?,?,?,?)",params);
						PrintWriter out = response.getWriter();
						JBuilder json2 = new JBuilder();
						System.out.println("post:"+this.getFileName(file));
						System.out.println(json2.getJBuilder());
						w.close();
			        }
		}
	}
		
		//Esta funcion permite obtener el nombre del archivo
			private String getFileName(Part part) {
			    for (String content : part.getHeader("content-disposition").split(";")) {
			        if (content.trim().startsWith("filename")) {
			            return content.substring(
			                    content.indexOf('=') + 1).trim().replace("\"", "");
			        }
			    }
			    return null;
			}

	}

