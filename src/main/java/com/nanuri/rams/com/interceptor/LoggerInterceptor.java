package com.nanuri.rams.com.interceptor;

import java.util.Set;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class LoggerInterceptor implements HandlerInterceptor {
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		String requestBody = "";
		// String body = (String) request.getAttribute("requestBody"); // body 값을 읽음
		// String reqBodyObj = body.lines().collect(Collectors.joining(System.lineSeparator()));

		// Gson 객체 생성 (포맷팅을 위해 pretty printing 활성화)
        // Gson gson = new GsonBuilder().setPrettyPrinting().create();

		// Object jsonObject = gson.fromJson(reqBodyObj, Object.class);
		// String formatJson = gson.toJson(jsonObject);

		if ( "POST".equalsIgnoreCase(request.getMethod()) ) {
			// requestBody = formatJson;
		} else if( !request.getParameterMap().isEmpty() ) {
			requestBody = logPrintParameter(request);
		}

		log.debug( "\n============= S T A R T =============\n URI ==> {} \n=====================================", request.getRequestURI() );
		log.debug( "\n========= Request Prameters ========= \n{}\n=====================================", requestBody );

		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {

				// if (modelAndView != null && modelAndView.getModel().containsKey("total")) {
				// 	Object total = modelAndView.getModel().get("total");
				// 	log.debug("Total: {}", total);
				// }

		log.debug( "\n=============== E N D ===============\n URI ==> {} \n=====================================", request.getRequestURI());

	}
	
	private String logPrintParameter(HttpServletRequest request) {
    	String param = "";
	
    	Set<String> keySet = request.getParameterMap().keySet();
    	for(String key: keySet) {
//    		log.debug(key + ": " + request.getParameter(key));
    		param += key + " : " + request.getParameter(key) + " ,\n";
    	}
    	if(!param.isEmpty()) {
//    		log.debug("param length : " + param.length());
    		param = param.substring(0, param.length()-1);
    	}
    	
    	return param;
    }
}
