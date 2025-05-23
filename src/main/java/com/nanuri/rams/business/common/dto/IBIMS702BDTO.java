package com.nanuri.rams.business.common.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
/*
 금융감독원보고자료관리 CPC2 보고서 양식 DTO
*/
public class IBIMS702BDTO {

    private String stdrYm;                           //  기준년월
    private String dprtCd;                           //  부서코드
    private int rgstSn;                              //  등록일련번호
    private String rptsIemMngmNo;                    //  보고서항목관리번호
    private String cmpNm;                            //  회사명
    private String fssCmpCd;                         //  금융감독원회사코드
    private String wrtnStdrDt;                       //  작성기준일자
    private String prdtNm;                           //  상품명
    private String ctrtDt;                           //  계약일자
    private String expDt;                            //  만기일자
    private String rptsInvShpCd;                     //  보고서투자형태코드
    private String rptsInvShpDetlCd;                 //  보고서투자형태상세코드
    private String pfThcsDcd;                        //  PF해당구분코드
    private String pfTpDcd;                          //  PF유형구분코드
    private String pfSlltTpDcd;                      //  PF분양유형구분코드
    private String pfErnTpDcd;                       //  PF수익유형구분코드
    private String rlesTpDcd;                        //  부동산유형구분코드
    private String bssAsstLctpDcd;                   //  기초자산소재지구분코드
    private String rlesLctpZpcd;                     //  부동산소재지우편번호
    private String lctpAddr;                         //  소재지주소
    private String ntnNm;                            //  국가명
    private String ovrsLctCtyNm;                     //  해외소재도시명
    private String unsldThcsDcd;                     //  미분양해당구분코드
    private BigDecimal lmtLoanCtrcAmt;               //  한도대출약정금액
    private BigDecimal loanBlce;                     //  대출잔액
    private String brwrNm;                           //  차주명
    private String brwrChrDcd;                       //  차주성격구분코드
    private String brwrCrno;                         //  차주법인등록번호
    private String rptsIntrtShpDcd;                  //  보고서금리형태구분코드
    private BigDecimal ctrcLoanIntrt;                //  약정대출금리
    private BigDecimal nowLoanIntrt;                 //  현재대출금리
    private String ovduThcsDcd;                      //  연체해당구분코드
    private String ovduRsn;                          //  연체사유
    private String loanExpXtnsThcsDcd;               //  대출만기연장해당구분코드
    private String loanExpXtnsRsn;                   //  대출만기연장사유
    private BigDecimal eprzCrdlInvAmt;               //  기업여신투자금액
    private String acivCrpNm;                        //  피투자법인명
    private String acivCrpChrCd;                     //  피투자법인성격코드
    private String acivCrno;                         //  피투자법인등록번호
    private BigDecimal parIntrRt;                    //  액면이자율
    private BigDecimal frsInvPotLtvRto;              //  최초투자시점LTV비율
    private BigDecimal wrtnStdrDeLtvRto;             //  작성기준일LTV비율
    private String ltvOutputMthDcd;                  //  LTV산출방법구분코드
    private BigDecimal aprsPrc;                      //  감정가격
    private BigDecimal totSlltAmt;                   //  총분양금액
    private BigDecimal jdgmTeamPrsmAmt;              //  심사팀추정금액
    private String pybkRankDcd;                      //  변제순위구분코드
    private BigDecimal rlesRentGrteAmt;              //  부동산임대보증금액
    private BigDecimal prfdRankAmt;                  //  우선순위금액
    private BigDecimal sodrAmt;                      //  동순위금액
    private BigDecimal bkbnAmt;                      //  후순위금액
    private String otcmCrdtRifcThcsDcd;              //  타사신용보강해당구분코드
    private String otcmCrdtRifcMnDcd;                //  타사신용보강수단구분코드
    private String sq1CrdtRifcCmpNm;                 //  1차신용보강회사명
    private String sq1CrdtRifcCmpCrno;               //  1차신용보강회사법인등록번호
    private String sq1CrdtRifcCmpCrdtGrdCd;          //  1차신용보강회사신용등급코드
    private String sq2CrdtRifcCmpNm;                 //  2차신용보강회사명
    private String sq2CrdtRifcCmpCrno;               //  2차신용보강회사법인등록번호
    private String sq2CrdtRifcCmpCrdtGrdCd;          //  2차신용보강회사신용등급코드
    private String efceCmpNm;                        //  시행회사명
    private String efceCmpCrno;                      //  시행회사법인등록번호
    private String pfEfceShpDcd;                     //  PF시행형태구분코드
    private String pfBusiApvlStepCd;                 //  PF사업승인단계코드
    private String pfCsstStepCd;                     //  PF착공단계코드
    private String pfSlltStepCd;                     //  PF분양단계코드
    private String pfCnfnStepCd;                     //  PF준공단계코드
    private BigDecimal totBusiAmt;                   //  총사업금액
    private BigDecimal rvnuAmt;                      //  매출금액
    private BigDecimal slfCpta;                      //  자기자본금
    private BigDecimal unSqmsSlltAmt;                //  단위면적분양금액
    private BigDecimal mdwyGoldRdmpRto;              //  중도금상환비율
    private BigDecimal allSqms;                      //  전체면적
    private BigDecimal estmEmrmRt;                   //  예상공실율
    private BigDecimal unSqmsEstmRentErnAmt;         //  단위면적예상임대수익금액
    private BigDecimal unSqmsEstmRentCt;             //  단위면적예상임대비용
    private BigDecimal estmPurBsnErnAmt;             //  예상순수영업수익금액
    private BigDecimal pfStlnTotLoanAmt;             //  PF대주총대출금액
    private BigDecimal pfStlnPtciIsttNum;            //  PF대주참여기관수
    private String pfStlnLoanExpDt;                  //  PF대주대출만기일자
    private String sq1StlnIsttNm;                    //  1차대주기관명
    private String sq1StlnIsttCrno;                  //  1차대주기관법인등록번호
    private BigDecimal sq1StlnLoanAmt;               //  1차대주대출금액
    private String sq2StlnIsttNm;                    //  2차대주기관명
    private String sq2StlnIsttCrno;                  //  2차대주기관법인등록번호
    private BigDecimal sq2StlnLoanAmt;               //  2차대주대출금액
    private String sq3StlnIsttNm;                    //  3차대주기관명
    private String sq3StlnIsttCrno;                  //  3차대주기관법인등록번호
    private BigDecimal sq3StlnLoanAmt;               //  3차대주대출금액
    private String sq4StlnIsttNm;                    //  4차대주기관명
    private String sq4StlnIsttCrno;                  //  4차대주기관법인등록번호
    private BigDecimal sq4StlnLoanAmt;               //  4차대주대출금액
    private String sq5StlnIsttNm;                    //  5차대주기관명
    private String sq5StlnIsttCrno;                  //  5차대주기관법인등록번호
    private BigDecimal sq5StlnLoanAmt;               //  5차대주대출금액
    private String busiApvlRqsDt;                    //  사업승인신청일자
    private BigDecimal landPchsRt;                   //  토지매입율
    private String rsplCnfnCfrmThcsDcd;              //  책임준공확약해당구분코드
    private String rsplCnfnCfrmIsttNm;               //  책임준공확약기관명
    private String rsplCnfnCfrmIsttCrno;             //  책임준공확약기관법인등록번호
    private String rsplCnfnEprzCrdtGrdCd;            //  책임준공기업신용등급코드
    private String csucCmpNm;                        //  시공회사명
    private String csucCmpCrno;                      //  시공회사법인등록번호
    private String csucCmpEprzCrdtGrdCd;             //  시공회사기업신용등급코드
    private String csstDt;                           //  착공일자
    private String cnfnDt;                           //  준공일자
    private BigDecimal plnFairRt;                    //  계획공정율
    private BigDecimal excFairRt;                    //  실행공정율
    private BigDecimal slltRt;                       //  분양율
    private String slltOpngDt;                       //  분양개시일자
    private BigDecimal moinRt;                       //  입주율
    private BigDecimal exitSlltRt;                   //  EXIT분양율
    private BigDecimal dvrSqms;                      //  전용면적
    private BigDecimal dvrSqmsUnAmt;                 //  전용면적단위금액
    private BigDecimal rentPsblTotSqms;              //  임대가능총면적
    private BigDecimal emrmRt;                       //  공실율
    private BigDecimal unSqmsRentErnAmt;             //  단위면적임대수익금액
    private BigDecimal unSqmsRentCt;                 //  단위면적임대비용
    private BigDecimal sq1YrlyPurBsnErnAmt;          //  1차연간순수영업수익금액
    private BigDecimal sq2YrlyPurBsnErnAmt;          //  2차연간순수영업수익금액
    private BigDecimal rlesTotLoanIntr;              //  부동산총대출이자
    private BigDecimal rlesTotLoanPaiAmt;            //  부동산총대출원리금금액
    private BigDecimal cptlRstrRt;                   //  자본환원율
    private BigDecimal ncrRskVl;                     //  NCR위험값
    private BigDecimal ncrRskAmt;                    //  NCR위험금액
    private String jobChrrNm;                        //  업무담당자명
    private String dptNm;                            //  부서명
    private String cplcCtns;                         //  연락처내용
    private Date hndDetlDtm;                         //  조작상세일시
    private String hndEmpno;                         //  조작사원번호
    private String hndTmnlNo;                        //  조작단말기번호
    private String hndTrId;                          //  조작거래ID
    private String guid;                             //  GUID
    
}
