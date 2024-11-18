package com.nanuri.rams.business.common.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DS01010SVO {
	
	@Getter
	@Setter
	public static class inqueryParameters{
		private String inspctDprtCcd;		
		private String mmStartDt;			
		private String mmEndDt;
		private String bfStartDt;
		private String bfEndDt;
		private String mmQ;
		private String bfQ;
		private String stdYrMm;
		private String weekStrtDt;
		private String weekEndDt;
	}
}
