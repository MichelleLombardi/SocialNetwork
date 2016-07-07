package jmlv.org.instagram;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLDecoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * Servlet implementation class Get_video
 */
@WebServlet("/get-video")
public class Get_video extends HttpServlet {
	private static final long serialVersionUID = 1L;	 
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Get_video() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
			String dir = request.getParameter("path");
			ServletOutputStream out = response.getOutputStream();
			InputStream in = new FileInputStream(dir);
			String mimeType = "video/mp4";
			byte[] bytes = new byte[1024];
			int bytesread;
			
			response.setContentType(mimeType);
			while((bytesread = in.read(bytes))!= -1){
				out.write(bytes,0,bytesread);
			}
			in.close();
			out.close();
			}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
