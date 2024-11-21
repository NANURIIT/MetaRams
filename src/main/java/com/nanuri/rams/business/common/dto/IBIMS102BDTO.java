package com.nanuri.rams.business.common.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 RM활동내역 Table.IBIMS102B DTO
*/
public class IBIMS102BDTO {
    private int rmSq;                      // RM일련번호
    //private String corpRgstNo;             // 법인등록번호
    private String bsnsRgstNo;             // 사업자등록번호
    private String entpHnglNm;             // 업체한글명
    private String metTitl;                // 미팅제목
    private String metDt;                  // 미팅일자
    private String metTm;                  // 미팅시간
    private String metPrps;                // 미팅목적
    private String metCntnt;               // 미팅내용
    private String chrgDprtCd;             // 담당부점코드
    private String chrrEmpno;               // 담당자사원번호
    private String cstmNm;                 // 고객명
    private String cstmPhNo;               // 고객전화번호
    private int atchFleSn;                 // 첨부파일일련번호
    private String lastYn;                 // 최종여부
    private Date hndDetlDtm;               // 조작상세일시
    private String hndEmpno;               // 조작사원번호
    private String hndlDprtCd;			   //처리부점코드
    private String fstInptPEno;            //최초입력자개인번호
    
    private String entpCd;			  	   //업체코드
	private String chrgDprtNm;			   //담당부서명
	private String chrgPNm;				   //담당자명
	private String rmCount;				   //활동건수
	private String enoCnt;				   //담당자건수
	private String custCnt;				   //고객건수
	private String fileCnt;				   //첨부파일건수
    private String hndTmnlNo;
    private String hndTrId;
    private String guid;
}