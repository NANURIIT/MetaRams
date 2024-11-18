package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 딜승인결재기본 - 결재내역조회(TB06080S) - Table.IBIMS231B DTO
*/
public class IBIMS231BDTO {
	private BigDecimal	decdSn;			/* 결재일련번호		*/
	private int			apvlRqstSq;		/* 승인요청순번		*/
	private String		chrrEno;		/* 책임자사번		*/
	private String		apvlRqstPEno;	/* 승인요청자사번	*/
	private String		decdStepDCd;	/* 결재단계구분코드	*/
	private String		decdSttsDCd;	/* 결재상태구분코드	*/
	private String		dealNo;			/* 딜번호			*/
	private String		decdJobDcd;		/* 결재업무구분코드	*/
	private String		scrnNo;			/* 화면번호		*/
	private String		apvlRqstCntn;	/* 승인요청내용		*/
	private Date		rqstDtm;		/* 신청일시		*/
	private Date		rqstCnclDtm;	/* 신청취소일시		*/
	private String		prcsRsltDCd;	/* 처리결과구분코드	*/
	private int			excSq;			/* 실행순번		*/
	private int			rqstSq;			/* 신청순번		*/
	private int			trSq;			/* 거래순번		*/
	private String		errCntn;		/* 오류내번		*/
	private int			lastDecdSq;		/* 최종결재순번		*/
	private Date		hndDetlDtm;		/* 조작상세일시		*/
	private String		hndEmpno;		/* 조작사원번호		*/
	private String		hndTmnlNo;		/* 조작단말기번호	*/
	private String		hndTrId;		/* 조작거래ID		*/
	private String		guid;			/* GUID			*/
}