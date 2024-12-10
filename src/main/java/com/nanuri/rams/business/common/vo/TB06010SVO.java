package com.nanuri.rams.business.common.vo;

import java.math.BigDecimal;

import com.nanuri.rams.business.common.dto.IBIMS201BDTO;

import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class TB06010SVO {
	private String dealNo;
	private String mtrDcd;
	private String jdgmDcd;
	private String mtrNm;
	private String mtrAbbrNm;
	private String prdtCd;
	private String prdtNm;
	private String prdtDsc;
	private String prgSttsCd;
	private String cnsbDcd;
	private String rsltnYr;
	private String cnsbSq;
	private long sn;
	private String apvlDt;
	private BigDecimal apvlAmt;
	private String sdnCndtF;
	private String etcCndtF;
	private BigDecimal sumApvlAmt;
	private String optrRgstNo;
	private String corpNo;
	private String entpNm;
	private String dmsCrdtGrdDcd;
	private String crdtInqDt;
	private String prdtLclsCd;
	private String prdtMdclCd;
	private String prdtClsfCd;
	private String ibPrdtClsfCd;
	private String altnInvYn;
	private String ortnFndCd;
	private String dskCd;
	private String invstNtnCd;
	private String invNtnCd;
	private String rlesFnnYn;
	private String rlesFnnDetlDcd;
	private String socYn;
	private String socDcd;
	private String holdPrpsDcd;
	private String sppiSfcYn;
	private String offrSrvcDcd;
	private String actsCd;
	private String rgstCbndYn;
	private String trCrryCd;
	private String indvLmtDcd;
	private String ctrcPrdDcd;
	private int ctrcPrdMnum;
	private String thcoRlDcd;
	private String sglLoanYn;
	private String mrtgStupYn;
	private String sdnTrgtYn;
	private String cnncPrdtCd;
	private String chrrEmpno;
	private String empNm;
	private String dprtCd;
	private String dprtNm;
	private String untpFndYn;
	private String pplcFndYn;
	private String stupDt;
	private String trustEdDt;
	private String rpchPsblDt;
	private String sglInvYn;
	private String ibPrdtPefDcd;
	private String etcDetSctyDcd;
	private String lstYn;
	private String isuDt;
	private String expDt;
	private String rdmpClmPsblDt;
	private String cfrmYn;
	private String fndNm;
	private String trOthrDscmNm;
	private String trOthrDscmNo;
	private String frxcHdgeYn;


	private String         fincYn;							//250B테이블 프로덕트코드
    private String         dcmNo;                                  //문서번호
    private String         jobExcuMbdy;                          //업무집행주체명
    private String         realMngmBdcd;                         //실제관리부점코드
    private String         realMngmEmpno;                        //실제관리사원번호
    private String         fondDt;                               //설립일자
    private String         estDt;                                //설립일자
    private String         keepExprDt;                            //존속만료일자
    private String         invExprDt;                             //투자만료일자
    private BigDecimal     fincCtrcAmt;                           //출자약정금액
    private BigDecimal     fincFlflAmt;                          //출자이행금액
    private BigDecimal     thcoFincCtrcAmt;                         //당사출자약정금액
    private BigDecimal     thcoFincAmt;                           //당사출자금액
    private BigDecimal     nowFincBlce;                           //현재출자잔액
    private BigDecimal     mngmPayBlce;                            //관리보수잔액
    private BigDecimal     ernDstrAmt;                            //수익분배금액
    private BigDecimal     fincQotaRt;                            //출자지분률
    private BigDecimal     stdrErnRt;                            //기준수익율
    private BigDecimal     mngmPayRt;                            //관리보수율
    private String         fincChrDcd;                           //출자성격구분 (1.블라인드 / 2. 프로젝트)
    private int            fincEdycNo;                          //출자증서번호
    private String         rptTrgtYn;                           //보고대상여부
    private String         aflTrgtYn;                           //계열사대상여부
    private String         dpndCmpYn;                            //종속회사여부
    private String         demgYn;                               //손상여부
    private BigDecimal     demgLssdCmlAmt;                       //손상차손누계금액
    private BigDecimal     demgBfFincBlce;                       //손상이전출자금잔액
    private String         stlaSttmNo;                          //결산전표번호
    private BigDecimal     acqAmt;                              //취득금액
    private String         crryCd;                              //통화코드
    //private BigDecimal     stdrExrt;                            //기준환율
    private BigDecimal     frcrFincBlce;                         //외화출자금잔액
    private BigDecimal     frcrMngmPayBlce;                      //외화관리보수잔액
    private BigDecimal     curdDstrAmt;                          //표시통화분배금액
    private BigDecimal     frcrFrsAcqAmt;                        //외화최초취득금액
    private BigDecimal     frcrFincCtrcAmt;                      //외화출자약정금액
    private BigDecimal     frcrFincFlflAmt;                         //외화출자이행금액
    private BigDecimal     frcrThcoFincCtrcAmt;                     //외화당사출자약정금액
    private BigDecimal     frcrThcoFincAmt;                        //외화당사출자금액
    private String         frsTrDt;                                //최초거래일자
    private BigDecimal     prfmPayBlce;                            //성과보수잔액
    private BigDecimal     prcrPrfmPayBlce;                        //외화성과보수잔액
    private BigDecimal 	   totIssuShqt;							   //총발행좌수
    private BigDecimal	   totIssuStkQnt;						   //총발행주수		

	private String rqsKndCd;
	private String eprzCrdlIndvLmtDcd;
}
