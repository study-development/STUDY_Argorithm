package test.api.domair;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.sql.Connection;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.TrustManagerFactory;
import javax.net.ssl.X509TrustManager;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class PublicDataHttpConnectTeest {

	final Logger log = LoggerFactory.getLogger(PublicDataHttpConnectTeest.class);
	
//	@Before
	public void beforeTest() throws Exception{
			log.info(" ***** BEFORE TEST CASE ***** ");
			log.info(" ***** END OF BEFORE TEST CASE ***** ");
	}
	
	@Test
	public void eastarCallTest() throws Exception {
		log.error("********** TestCase Start ********** ");

		String serviceKey = "TPPjMZN%2Frx2djgOCiE6OLBOB1bbv%2B3KfxAtY3ve6wA5famTua%2Fc6vZULxBv2moCFjjg40ubcIwZA%2FhOuAeyn0w%3D%3D";

		StringBuilder urlBuilder = new StringBuilder("http://openapi.airport.co.kr/service/rest/FlightScheduleList/getIflightScheduleList"); /*URL*/
//        urlBuilder.append("?" + URLEncoder.encode("ServiceKey","UTF-8") + "=서비스키"); /*Service Key*/
        urlBuilder.append("?" + URLEncoder.encode("schDate","UTF-8") + "=" + URLEncoder.encode("20181102", "UTF-8")); /*검색일자*/
        urlBuilder.append("&" + URLEncoder.encode("schDeptCityCode","UTF-8") + "=" + URLEncoder.encode("GMP", "UTF-8")); /*출발 도시 코드*/
        urlBuilder.append("&" + URLEncoder.encode("schArrvCityCode","UTF-8") + "=" + URLEncoder.encode("HND", "UTF-8")); /*도착 도시 코드*/
//        urlBuilder.append("&" + URLEncoder.encode("schAirLine","UTF-8") + "=" + URLEncoder.encode("NH", "UTF-8")); /*항공편 코드*/
//        urlBuilder.append("&" + URLEncoder.encode("schFlightNum","UTF-8") + "=" + URLEncoder.encode("NH862", "UTF-8")); /*항공편 넘버*/
        urlBuilder.append("&" + URLEncoder.encode("serviceKey","UTF-8") + "=" + URLEncoder.encode(serviceKey, "UTF-8")); /*인증키*/
        
		String apiName = "getDflightScheduleList";
		URL url = new URL(urlBuilder.toString());
		
		log.info(" ***** Public Data API Call TEST ***** ");
		log.info(" ** KAC "+ apiName +" REQ : " + url);
		
		//ZE 신규 API 서버 URL
//		URL url = new URL("http://openapi.airport.co.kr/service/rest/DflightScheduleList/"+apiName+"?serviceKey="+serviceKey+"schDepCityCode=GMP&schArrCityCode=PUS");
		
		URLConnection connection = null;
		HttpURLConnection httpClient = null;
        BufferedWriter bw = null;
        BufferedReader br = null;
        StringBuffer sb = new StringBuffer();
		
        try {
			connection = url.openConnection();
		} catch (Exception e) {
			log.error("URLConnection url.openConnection() : " + e.toString()); 
		}
        connection.setDoOutput(true);
        connection.setDoInput(true);
        connection.setAllowUserInteraction(false);
        
        httpClient = (HttpURLConnection) connection;
        httpClient.setRequestMethod("GET");
        httpClient.setRequestProperty("Content-Type", "application/json");
        httpClient.setReadTimeout(20000);
        
        log.info(" ** KAC API CALL RESOPNSE METHOD : " + httpClient.getRequestMethod());
        log.info(" ** KAC API CALL RESOPNSE CODE : " + httpClient.getResponseCode());
        log.info(" ** KAC API CALL RESOPNSE STATUS : " + httpClient.getResponseMessage());
		
//      단순 호출 쓸데이터가 없기 때문에 Wirte는 생략
//      bw = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream()));
//		bw.write(data);
//      bw.flush();
        
        br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String line = "";
        while ((line = br.readLine()) != null) {
        	sb.append(line.trim());
        }
        
        String resJsonLog = sb.toString();
        log.info(" ** KAC API CALL RES : " + resJsonLog);
		log.error("********** TestCase End ********** ");
	}
	
//	@After
	public void afterTest() throws Exception{
			log.info(" ***** AFTER TEST CASE ***** ");
			log.info(" ***** END OF AFTER TEST CASE ***** ");
	}

}
