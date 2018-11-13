package argorithm.backjoon.day1.permutation;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Day1_permutation_4_DFS {
	
	static int[] output;
	 
    public static void main(String args[]) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int N = Integer.parseInt(br.readLine());
        int[] arr = new int[N];
        output = new int[N];
        boolean[] visited = new boolean[N];
        for (int i = 0; i < N; i++) {
            visited[i] = true;
            DFS(arr, visited, N, i, 0);
            visited[i] = false;
        }
    }
 
    public static void DFS(int[] arr, boolean[] visited, int N, int start, int depth) {
        output[depth] = start + 1;
        if (depth == N - 1) {
            for (int i = 0; i < N; i++)
                System.out.print(output[i] + " ");
            System.out.println();
            return;
        }
        for (int i = 0; i < N; i++) {
            if (visited[i])
                continue;
            visited[i] = true;
            DFS(arr, visited, N, i, depth + 1);
            visited[i] = false;
        }
    }
}

//참고 : https://zoonvivor.tistory.com/136