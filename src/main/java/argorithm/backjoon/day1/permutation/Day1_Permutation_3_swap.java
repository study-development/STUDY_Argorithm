package argorithm.backjoon.day1.permutation;

public class Day1_Permutation_3_swap {

	public static void main(String[] args) { 
		int[] arr = { 1, 2, 3, 4 }; 
		perm(arr, 0, 4, 4); 
	}// main() end

	public static void perm(int[] arr, int depth, int n, int k) { 
		if (depth == k) { // 한번 depth 가 k로 도달하면 사이클이 돌았음. 출력함. 
			print(arr,k); 
			return; 
		}// if end 
		
		// 자바에서는 포인터가 없기 때문에 아래와 같이, 인덱스 i와 j를 통해 바꿔줌.
		for (int i = depth; i < n; i++) { 
			swap(arr, i, depth); 
			perm(arr, depth + 1, n, k); 
			swap(arr, i, depth); 
		} 
	}// perm end  
	
	public static void swap(int[] arr, int i, int j) { 
		int temp = arr[i]; 
		arr[i] = arr[j]; 
		arr[j] = temp; 
	}// swap() end
	
	public static void print(int[] arr, int k) { 
		for (int i = 0; i < k; i++) { 
			if (i == k - 1) 
				System.out.println(arr[i]); 
			else 
				System.out.print(arr[i] + ","); 
		}// for end
	}// print() end
	
}// class end



// 참고 : http://gorakgarak.tistory.com/522