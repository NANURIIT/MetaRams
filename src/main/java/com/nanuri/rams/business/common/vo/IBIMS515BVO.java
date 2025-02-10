package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;

import com.nanuri.rams.business.common.dto.IBIMS515BDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/* 
투자사후운용사관리내역 Table.IBIMS515B VO
*/
public class IBIMS515BVO extends IBIMS515BDTO{

    private String entpNm; /* 업체명 */
	private String rnbn; /* 주민사업자등록번호 */
	private String crno; /* 법인등록번호 */
	private String estDt;		/* 설립일자 */
	private BigDecimal   stffNum;		/* 직원수 */
	private BigDecimal   oprtHnfNum;	/* 운영인력수 */

}
