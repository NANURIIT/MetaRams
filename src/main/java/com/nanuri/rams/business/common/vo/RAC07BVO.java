package com.nanuri.rams.business.common.vo;

import java.sql.Date;

import com.nanuri.rams.business.common.dto.RAC07BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RAC07BVO {
	
	@Getter
	@Setter
	public static class selectVO extends RAC07BDTO{

		private String     ibDealNo;                  // IBDEAL번호-key
		private String     riskInspctCcd;             // 리스크심사구분코드
		private String     lstCCaseCcd;               // 부수안건구분코드
		private int        ibDealSq;                  // IBDEAL일련번호
		private String     dscDt;                     // DSC일자
		private int        dscSq;                     // DSC일련번호
		private int        dscSqc;                    // DSC회차
		private String     ibDealNm;                  // IBDEAL명
		private String     ibDealPrgrsStCd;           // IBDEAL진행상태코드
		private String     dscRsltCd;                 // DSC결과코드
		private double     tlAmt;                     // 총금액
		private double 	   ptcpAmt;                   // 참여금액
		private double 	   tlErnAmt;                  // 총수익금액
		private double 	   wrtErnAmt;                 // 기표수익금액
		private double 	   rcvblErnAmt;               // 미수수익금액
		private String     entpCd;                    // 업체코드
		private String     entpRnm;                   // 업체실명
		private String     corpRgstNo;                // 법인등록번호
		private String     crdtGrdCd;                 // 신용등급코드
		private String     wrtDt;                     // 기표일자
		private String     mtrtDt;                    // 만기일자
		private String     invstNtnCd;                // 투자국가코드
		private String     invstCrncyCd;              // 투자통화코드
		private double     crncyAmt;                  // 통화금액
		private String     invstGdsLdvdCd;            // 투자상품대분류코드
		private String     invstGdsMdvdCd;            // 투자상품중분류코드
		private String     invstGdsSdvdCd;            // 투자상품소분류코드
		private String     invstGdsDtlsDvdCd;         // 투자상품상세분류코드
		private String     gdsDvd1Nm;                 // 상품분류1명
		private String     gdsDvd2Nm;                 // 상품분류2명
		private String     gdsDvd3Nm;                 // 상품분류3명
		private String     gdsDvd4Nm;                 // 상품분류4명
		private String     coprtnTypCd;               // 협업유형코드
		private String     hdqtCd;                    // 본부코드
		private String     dprtCd;                    // 부점코드
		private String     chrgPEno;                  // 담당자사번
		private String     wthldTblNm;                // 원천테이블명
		private Date       fnlUptDyTm;                // 최종변경일시
		private Date       hndlDyTm;                  // 처리일시
		private String     hndlDprtCd;                // 처리부점코드
		private String     hndlPEno;                  // 처리자사번
		
		private String     appvWaitCnt;               // 결재대기개수
		private String     appvPrgrsCnt;              // 결재진행개수
		private String     metCnt;                    // RM미팅개수
		private String     empNm;                  	  // 담당자명
		private String     dprtNm;                    // 요청자부서명
		private String     cdVlNm;                    // 작업구분명 
		private String     reqCcdNm;                  // 작업구분명
		private String     regEnoNm;                  // 요청자명
		
		
		
	}
	

}
