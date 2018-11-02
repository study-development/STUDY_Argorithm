package test.api.jaxb;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
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
import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;

import lombok.extern.slf4j.Slf4j;
import test.api.jaxb.domain.marshar.Customer;

@Slf4j
public class MarsharlingTest {

	final Logger log = LoggerFactory.getLogger(MarsharlingTest.class);
	
//	@Before
	public void beforeTest() throws Exception{
			log.info(" ***** BEFORE TEST CASE ***** ");
			log.info(" ***** END OF BEFORE TEST CASE ***** ");
	}
	
	@Test
	public void eastarCallTest() throws Exception {
		log.error("********** TestCase Start ********** ");
		
		try {
			File file = new File("C:\\Users\\최용석\\Desktop\\jaxbTest\\Customer.xml");
			JAXBContext jaxbContext = JAXBContext.newInstance(Customer.class);
			
			Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
			
			Customer customer = (Customer) jaxbUnmarshaller.unmarshal(file);
			log.info("customer : " + customer);
		} catch (Exception e) {
			log.error("unmarsharlling is failed");
		}
		
	
		log.error("********** TestCase End ********** ");
	}
	
//	@After
	public void afterTest() throws Exception{
			log.info(" ***** AFTER TEST CASE ***** ");
			log.info(" ***** END OF AFTER TEST CASE ***** ");
	}

}
