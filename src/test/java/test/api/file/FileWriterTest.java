package test.api.file;

import static org.junit.Assert.*;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class FileWriterTest {

//	@Before
	public void setUp() throws Exception {
	}

	@Test
	public void test() throws IOException {
		Logger log = LoggerFactory.getLogger(FileWriterTest.class);
	    final String LINE_SEPARATOR = System.getProperty("line.separator");

		String name = "Hana Lee";
		int age = 37;
		double temp = 27.3d;
		FileWriter fw = null;
		
		fw = new FileWriter(new File("C:\\Users\\최용석\\Desktop\\jaxbTest\\test.java"));
		 
        try {
        	
        	fw.write(String.format("public class "));
			fw.write(String.format("My name is %s.", name));
			fw.write(LINE_SEPARATOR);
			fw.write(String.format("I am %d years old.", age));
			fw.write(LINE_SEPARATOR);
			fw.write(String.format("Today's temperature is %.2f.", temp));
			
		} catch (IOException e) {
			log.error("fileWriter is failed");
		} finally {
			//close resources
			if (fw != null) fw.close();
		}
	}
	
//	@After
	public void setAfter() {
		
	}

}
