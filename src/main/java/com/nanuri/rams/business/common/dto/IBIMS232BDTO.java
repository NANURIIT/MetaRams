package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
 딜승인결재담당자내역 - 결재내역조회(TB06080S) - Table.IBIMS232B DTO
*/
public class IBIMS232BDTO {
	private int			decdSn;			/* 결재일련번호 */
	private int			decdSq;			/* 결재순번 */
	private String		decdSttsDcd;	/* 결재상태구분코드 */
	private String		dcfcEno;		/* 결재자사번 */
	private Date		decdDtm;		/* 결재일시 */
	private String		dcfcAnnoCntn;	/* 결재자주석내용 */
	private String		rjctYn;			/* 반려여부 */
	private String		rjctRsnCntn;	/* 반려사유내용 */
	private Date		hndDetlDtm;		/* 조작상세일시 */
	private String		hndEmpno;		/* 조작사원번호 */
	private String		hndTmnlNo;		/* 조작단말기번호 */
	private String		hndTrId;		/* 조작거래ID */
	private String		guid;			/* GUID */
}