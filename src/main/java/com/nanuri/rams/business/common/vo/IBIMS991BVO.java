package com.nanuri.rams.business.common.vo;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
public class IBIMS991BVO  {
	private String stdrDt;		// 조회건수
	private String bfDt; 		// 적용금리
	private String afDt;		// 적용금리
	private String dayofweeks;	// 적용금리
	private String holiday;		// 적용금리
	private String content;		// 적용금리
}
