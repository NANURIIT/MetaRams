package com.nanuri.rams.business.common.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/*
 딜승인기본 Table.IBIMS201B DTO
*/
public class IBIMS201BDTO {

    private String prdtCd;                          //  상품코드
    private int    sn;                          //  일련번호
    private String lastYn;                          //  최종여부
    private String prdtNm;                          //  상품명
    private String prdtDsc;                         //  상품설명
    private String rqsKndCd;                        //  기업여신신청종류코드
    private String prgSttsCd;                       //  진행상태코드
    private String cnncPrdtCd;                      //  연결상품코드
    private String dealNo;                          //  딜번호
    private String dealNm;                          //  딜명
    private String mtrNo;                           //  안건번호
    private String mtrDcd;                          //  부수안건구분코드
    private int    mtrSn;                           //  부수안건일련번호
    private String jdgmDcd;                         //  심사구분코드
    private String mtrNm;                           //  안건명
    private String locoIssMngmNo;                   //  loc발급관리번호
    private String invIdtrtSmitYn;                  //  투자확약서제출여부
    private String trgYn;                           //  트리거여부
    private String trgCndCtns;                      //  트리거조건내용
    private String invIdtrtSmitDt;                  //  투자확약서제출일자
    private String trOthrDscmNo;                    //  거래상대방식별번호
    private String grupItgrCrdtGrdDcd;              //  그룹통합신용등급구분코드
    private String dmsCrdtGrdDcd;                   //  국내신용등급구분코드
    private String crdtInqDt;                       //  신용조회일자
    private String lstYn;                           //  상장여부
    private String stlnCpstDcd;                     //  대주구성구분코드
    private String frsMngmBdcd;                     //  최초관리부점코드
    private String mngmBdcd;                        //  관리부점코드
    private String chrrEmpno;                       //  담당자사원번호
    private String subChrrEmpno;                    //  서브담당자사원번호
    private String prdtClsfCd;                      //  상품분류코드
    private String prdtMdclCd;                      //  기업여신상품중분류코드
    private String prdtLclsCd;                      //  기업여신상품대분류코드
    private String ibPrdtClsfCd;                    //  ib상품분류코드
    private String ibPrdtIflwPathDcd;               //  ib상품유입경로구분코드
    private String ibPrdtPefDcd;                    //  ib상품pef구분코드
    private String actsCd;                          //  계정과목코드
    private String dcrbAthDcd;                      //  기업여신전결권한구분코드
    private String acctJobCd;                       //  회계업무코드
    private String acctUnJobCd;                     //  회계단위업무코드
    private String acctTrCd;                        //  회계거래코드
    private BigDecimal eprzCrdlApvlAmt;             //  승인금액
    private BigDecimal eprzCrdlCtrtAmt;             //  기업여신계약금액
    private BigDecimal eprzCrdlInvAmt;              //  기업여신투자금액
    private String eprzCrdlIntrRcvnMthCd;           //  기업여신이자수취방법코드
    private String intrBnaoDcd;                     //  이자선후취구분코드
    private String tfdLyAplyDcd;                    //  초일말일적용구분코드
    private String intrSnnoPrcsDcd;                 //  이자단수처리구분코드
    private String paiRdmpDcd;                      //  원리금상환구분코드
    private String ortnPrdtClsfCd;                  //  기업여신운용상품분류코드
    private String intrtExpDcd;                     //  기업여신금리만기구분코드
    private int		   intrtRestFrqcMnum;           //  금리재설정주기개월수
    private int		   prnaRdmpFrqcMnum;            //  원금상환주기개월수
    private int		   intrRdmpFrqcMnum;            //  이자상환주기개월수
    private int		   prnaDfrPrdMnum;              //  원금거치기간개월수
    private String eprzCrdlCtrtNo;                  //  기업여신계약번호
    private String ctrcPrarDt;                      //  약정예정일자
    private String ctrcPrdMnum;                     //  약정기간개월수
    private String ctrcPrdDcd;                      //  약정기간구분코드
    private String sglLoanYn;                       //  단독대출여부
    private String rgstCbndYn;                      //  등록사채여부
    private String apvlDt;                          //  승인일자
    private String expDt;                           //  만기일자
    private String edDt;                            //  종결일자
    private String stupDt;                          //  설정일자
    private String trustEdDt;                       //  신탁종료일자
    private String isuDt;                           //  발행일자
    private String eprzCrdlCtrtEndRsnCd;            //  기업여신계약종료사유코드
    private String eprzCrdlCtrtEndRsnCtns;          //  기업여신계약종료사유내용
    private String trCrryCd;                        //  거래통화코드
    private String invNtnCd;                        //  투자국가코드
    private String ortnFndCd;                       //  운용펀드코드
    private String dskCd;                           //  데스크코드
    private String eprzCrdlIndvLmtDcd;              //  기업여신개별한도구분코드
    private String ctlbCtrtShpDcd;                  //  우발채무계약형태구분코드
    private String ctlbBssAsstDcd;                  //  우발채무기초자산구분코드
    private String socYn;                           //  soc여부
    private String socDcd;                          //  soc구분코드
    private String mrtgStupYn;                      //  담보설정여부
    private String altnInvYn;                       //  대체투자여부
    private String crdtRifcAplyYn;                  //  신용보강적용여부
    private String frxcHdgeYn;                      //  외환헷지여부
    private String sppiSfcYn;                       //  sppi충족여부
    private String projFnnYn;                       //  프로젝트금융여부
    private String pplcFndYn;                       //  사모펀드여부
    private String untpFndYn;                       //  단위형펀드여부
    private String pfLoanYn;                        //  pf대출여부
    private String undwFnnYn;                       //  인수금융여부
    private String trchAplyYn;                      //  트렌치적용여부
    private String rlesFnnYn;                       //  부동산금융여부
    private String sdnTrgtYn;                       //  셀다운대상여부
    private String etcCndtYn;                       //  기타승인조건여부
    private String rlesFnnDetlDcd;                  //  부동산금융상세구분코드
    private String holdPrpsDcd;                     //  보유목적구분코드
    private String thcoRlDcd;                       //  당사역할구분코드
    private String offrSrvcDcd;                     //  제공서비스구분코드
    private BigDecimal ncrRt;                       //  ncr율
    private BigDecimal rwaRt;                       //  rwa율
    private String rpchPsblDt;                      //  환매가능일자
    private String dispYn;                          //  매각여부
    private String pplcCbndMpngYnDcd;               //  사모사채매핑여부구분코드
    private String etcDetSctyDcd;                   //  기타채무증권구분코드
    private String invJdgmComtNo;                   //  투자심사위원회번호
    private String dispDtDcd;                       //  매각일자구분코드
    private int    dispTlmtMnum;                    //  매각기한개월수
    private String dispStdrAmtDcd;                  //  매각기준금액구분코드
    private BigDecimal dispRto;                     //  기업여신매각비율
    private String dispTlmtDt;                      //  매각기한일자
    private String dispAmt;                         //  기업여신매각금액
    private String rdmpClmPsblDt;                   //  상환청구가능일자
    private String aprnGoldStupTrgtYn;              //  충당금설정대상여부
    private String bdbtRsvsRcknStdrLclsCd;          //  대손준비금산정기준대분류코드
    private String bdbtRsvsRcknStdrMdclCd;          //  대손준비금산정기준중분류코드
    private String bdbtRsvsRcknStdrSclsCd;          //  대손준비금산정기준소분류코드
    private BigDecimal bdbtRsvsRcknStdrRto;         //  대손준비금산정기준비율
    private BigDecimal thcoPtciAmt;                 //  당사참여금액
    private BigDecimal prdtTotAmt;                  //  상품총금액
    private String intrDnumClcMthCd;                //  이자일수계산방법코드
    private String hldyPrcsDcd;                     //  휴일처리구분코드
    private String stdrIntrtKndCd;                  //  기준금리종류코드
    private BigDecimal fxnIntrt;                    //  고정금리
    private BigDecimal addIntrt;                    //  가산금리
    private int		   intrtCngeFrqcMnum;           //  금리변동주기개월수
    private BigDecimal hdwtEvlAmt;                  //  수기평가금액
    private String eprzCrdlWeekMrtgKndCd;           //  기업여신주담보종류코드
    private BigDecimal ovduIntrRt;                  //  연체이자율
    private String ovduIntrRtDcd;                   //  연체이자율구분코드
    private BigDecimal totRdmpTmrd;                 //  총상환회차
    private BigDecimal eqlRdmpAmt;                  //  균등상환금액
    private BigDecimal istmDtmRdmpAmt;              //  할부일시상환금액
    private BigDecimal rcvbIntrAplyIrt;             //  미수이자적용이율
    private BigDecimal intrErnAmt;                  //  이자수익금액
    private BigDecimal fndsPrcrCtAmt;               //  자금조달비용금액
    private BigDecimal totIssuShqt; 				//  총발행좌수
    private BigDecimal totIssuStkQnt;				//  총발행주수
    private String intrClcEndDeDcd;                 //  이자계산종료일구분코드
    private String intrHdwtClcYn;                   //  이자수기계산여부
    private String grdCd;                           //  기업여신등급코드
    private String dshnRtGrdCd;                     //  기업여신부도율등급코드
    private String rgstDt;                          //  등록일자
    private String chngDt;                          //  변경일자
    private String earlyRepayYn;                    //  중도상환여부
    private String sglInvYn;                        //  단독투자여부
    private Date hndDetlDtm;                        //  조작상세일시
    private String hndEmpno;                        //  조작사원번호
    private String hndTmnlNo;                       //  조작단말기번호
    private String hndTrId;                         //  조작거래id
    private String guid;                            //  guid
    private String empNo;							//  담당자사번
    private String dprtCd;							//  관리부서
    private BigDecimal krwTrslExcAmt;				//  원화환산실행금액
    private BigDecimal krwTrslExcBlce;				//  원화환산실행잔액
    

    private String trDvsn;
}