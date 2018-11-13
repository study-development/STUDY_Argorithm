package argorithm.backjoon.day1.permutation;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class Day1_Permutation {

	// 순열 : permutation
	// n개의 원소중 r개를 뽑아 나열(중복 없는 모든 경우의 수)
	
	//valueArray : 순열 구성요소(nPr)중 n의 원소를 포함하는 배열
	int valueArray[] = {1, 2, 3, 4, 5};
	
	//depth : 순열 구성요소(nPr)중 n
	int depth = valueArray.length;
	
	//pickCnt : 순열 구성요소(nPr)중 r
	String pickCnt = "";
	
	
	BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
//	BufferedReader br2 = new BufferedReader(new InputStreamReader(System.in))
	
//	Integer. pickCnt = br.readLine();
	
	final Logger log = LoggerFactory.getLogger(Day1_Permutation.class);
	
	// 다음 depth의 원소 재 배치
	
	// 재귀함수
	
	//실행부
	public static void main(String[] args) throws IOException {
		Day1_Permutation day1_Permutation = new Day1_Permutation();
	}
	
	
	
}

/*
 * 작성자	: 최용석
 * 작성일 	: 2018-10-30 (화)
 * 작성내용 : 백준 알고리즘 순열 part
 * 참고 URL : https://www.acmicpc.net/problem/10974z
 * 
 * Q) N이 주어졌을 때, 1부터 N까지의 수로 이루어진 순열을 사전순으로 출력하는 프로그램을 작성하시오.
 * 
 * 입력 : 첫째 줄에 N(1 ≤ N ≤ 8)이 주어진다.  
 * 출력 : 첫째 줄부터 N!개의 줄에 걸쳐서 모든 순열을 사전순으로 출력한다.
 * 
 * ex) nPr -> 3P3일 경우
 * 
 * n = 3
 * r = 3
 * depth = 3
 * nPr = 3x2x1 = 6
 * 
 * 1, 2, 3	depth = 0	i = 0	
 * 1, 3, 2	depth = 1	i = 0
 * 2, 1, 3	depth = 1	i = 0
*/

