package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

/* 
 화면 출력 VO

 딜승인결재기본(IBIMS231B)
 딜승인결재담당자내역(IBIMS232B)
 딜기본정보(IBIMS101B)
*/
@Getter
@Setter
public class TB06080SVO {
	
	private String chrrEno;
	private String apvlRqstPEno;
	private String decdStepDcd;

	@Getter
	@Setter
	public static class ApvlList {
		private BigDecimal 	decdSn;			/* 결재일련번호		*/
		private int 		apvlRqstSq;		/* 승인요청순번		*/
		private String 		chrrEno;		/* 책임자사번		*/
		private String 		chrrEnm;		/* 책임자명		*/
		private String 		apvlRqstPEno;	/* 승인요청자사번	*/
		private String 		apvlRqstPEnm;	/* 승인요청자명		*/
		private String 		decdStepDcd;	/* 결재단계구분코드	*/
		private String 		decdStepNm;		/* 결재단계구분명	*/
		private String 		decdSttsDcd;	/* 결재상태구분코드	*/
		private String 		decdSttsNm;		/* 결재상태구분명	*/
		private String 		dealNo;			/* 딜번호			*/
		private String 		dealNm;			/* 딜명			*/
		private String 		decdJobDcd;		/* 결재업무구분코드	*/
		private String 		decdJobNm;		/* 결재업무구분명	*/
		private String 		scrnNo;			/* 화면번호		*/
		private String 		apvlRqstCntn;	/* 승인요청내용		*/
		private String 		rqstDtm;		/* 신청일시		*/
		private String 		rqstCnclDtm;	/* 신청취소일시		*/
		private String 		dcfcEno;		/* 담당자사번		*/
		private String 		dcfcEnm;		/* 담당자명		*/
		private String 		prcsRsltDcd;	/* 처리결과구분코드	*/
		private String 		prcsRsltNm;		/* 처리결과구분명	*/
		private int 		excSq;			/* 실행순번		*/
		private int 		rqstSq;			/* 신청순번		*/
		private int 		trSq;			/* 거래순번		*/
		private String 		errCntn;		/* 오류내번		*/
		private int 		lastDecdSq;		/* 최종결재순번		*/
	}
	
	@Getter
	@Setter
	public static class GbckList {
		private BigDecimal 	decdSn;			/* 결재일련번호		*/
		private int 		apvlRqstSq;		/* 승인요청순번		*/
		private String 		decdSq;			/* 결재순번		*/
		private String 		decdSttsDcd;	/* 결재상태구분코드	*/
		private String 		decdSttsNm;		/* 결재상태명		*/
		private String 		dcfcENo;		/* 결재자사번		*/
		private String 		dcfcENm;		/* 결재자명		*/
		private String 		decdDtm;		/* 결재일시		*/
		private String 		dcfcAnnoCntn;	/* 결재자주석내용	*/
		private String 		rjctYn;			/* 반려여부		*/
		private String 		rjctRsnCntn;	/* 반려사유내용		*/
	}
	
	private List<ApvlList> apvlList;
	private List<GbckList> gbckList;

}