package com.nanuri.rams.business.assessment.tb06.tb06015;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class MonthlyIntrtInfo {

	private int seq;							// 회차
	private String strtDt; 						// 종료일자
	private String endDt; 						// 종료일자
	private double monthlyRate; 				// 적용금리
	private double fxnIntrt; 					// 고정금리
	private double addIntrt; 					// 가산금리
	private String leadYn;						// 윤년여부
	
}
