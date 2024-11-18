package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TB03030DTO {
	
	private int rmSq;                  	  //RM일련번호	
	private String corpNo;                //법인등록번호
	private String metTitl;               //미팅제목	
	private String metDt;                 //미팅일자	
	private String metPrps;               //미팅목적		
	private String metCntnt;              //미팅내용	
	private String metTm;              	  //미팅시간	
	private String chrgDprtCd;            //담당부점코드	
	private String chrgPEno;              //담당자사번		
	private String cstmNm;                //고객명		
	private String cstmPhNo;              //고객전화번호
	private String fstInptDyTm;           //최초입력일시	
	private String fstInptPEno;           //최초입력자개인번호
	private String fnlUptDyTm;            //최종변경일시	
	private String fnlUptPEno;            //최종변경자개인번호
	private String hndlDprtCd;			  //처리부점코드
	
	private String corpNm;			  	  //업체명
	private String chrgDprtNm;			  //담당부서명
	private String chrgPNm;				  //담당자명
	private String rmCount;				  //활동건수
	private String enoCnt;				  //담당자건수
	private String custCnt;				  //고객건수
	private String fileCnt;				  //첨부파일건수
	
	private String fstHndlPEno;			  //최초등록자사번
	private String fstHndlDyTm;			  //최초등록일자
	private String lstHndlPEno;			  //최종변경자사번
	private String lstHndlDyTm;			  //최종변경일시

	
	

}
