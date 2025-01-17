package com.nanuri.rams.business.assessment.tb07.tb07120;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.IBIMS410BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS452BMapper;
import com.nanuri.rams.business.common.dto.IBIMS231BDTO;
import com.nanuri.rams.business.common.dto.IBIMS232BDTO;
import com.nanuri.rams.business.common.dto.IBIMS452BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS231BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS232BMapper;
import com.nanuri.rams.business.common.vo.IBIMS410BVO;
import com.nanuri.rams.business.common.vo.IBIMS452BVO;
import com.nanuri.rams.business.common.vo.TB07120SVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB07120ServiceImpl implements TB07120Service {

	private final AuthenticationFacade facade;

	private final IBIMS410BMapper ibims410bMapper;

	private final IBIMS231BMapper ibims231bMapper;	// 딜승인결재기본
	private final IBIMS232BMapper ibims232bMapper;	// 딜승인담당자
	private final IBIMS452BMapper ibims452bMapper;	// 품의기본
	
	/**
	 * 회계대사내역
	 */
	@Override
	public List<TB07120SVO> get07120sList(IBIMS410BVO param){
		List<TB07120SVO> result = ibims410bMapper.get07120sList(param);
		return result;
	};

	@Override
	public int updateFndsCnstDecd(TB07120SVO param){

		int result;

		String dealNo = param.getDealNo();
		String prdtCd = param.getPrdtCd();
		String scrnNo = param.getScrnNo();
		int excSeq = param.getExcSeq();
		int trSeq = param.getTrSeq();
		int rqstSq = param.getRqstSq();
		String dcfcEno = param.getDcfcEno();
		String rjctRsnCntn = param.getRjctRsnCntn();
		String ovrsTrnsYn = param.getOvrsTrnsYn();
		String decdStepDcd = param.getDecdStepDcd();
		String decdSttsDcd = param.getDecdSttsDcd();

		// 결재요청
		if ( "1".equals(decdSttsDcd) && "04".equals(decdStepDcd) ) {
			// 진행중, 승인요청
			int decdSn = ibims231bMapper.getDecdSn();
			rqstSq = ibims452bMapper.getErlmSeq();

			// 딜승인결재기본 입력
			IBIMS231BDTO dto231 = new IBIMS231BDTO();
			dto231.setDecdSn(decdSn);
			dto231.setApvlRqstPEno(facade.getDetails().getEno());
			dto231.setDecdStepDcd(decdStepDcd);
			dto231.setDecdSttsDcd(decdSttsDcd);
			dto231.setDealNo(dealNo);
			dto231.setPrdtCd(prdtCd);
			dto231.setDecdJobDcd(scrnNo);
			dto231.setScrnNo(scrnNo);
			dto231.setExcSeq(excSeq);
			dto231.setTrSeq(trSeq);
			dto231.setRqstSq(rqstSq);
			dto231.setLastDecdSq(1);
			dto231.setHndEmpno(facade.getDetails().getEno());
			ibims231bMapper.apvlRqst(dto231);

			// 딜승인담당자 입력
			IBIMS232BDTO dto232 = new IBIMS232BDTO();
			dto232.setDecdSn(decdSn);
			dto232.setDecdSq(1);
			dto232.setDecdSttsDcd(decdSttsDcd);
			dto232.setDcfcEno(dcfcEno);
			dto232.setHndEmpno(facade.getDetails().getEno());
			ibims232bMapper.apvlRqst(dto232);

			// 품의기본 입력
			IBIMS452BDTO dto452 = new IBIMS452BDTO();
			dto452.setPrdtCd(prdtCd);
			dto452.setExcSeq(excSeq);
			dto452.setTrSeq(trSeq);
			dto452.setErlmSeq(rqstSq);
			dto452.setRqstStfno(facade.getDetails().getEno());
			dto452.setReltStfno(dcfcEno);
			dto452.setOvrsTrnsYn(ovrsTrnsYn);
			dto452.setHndEmpno(facade.getDetails().getEno());
			ibims452bMapper.insertFndsCnstDecd(dto452);

			result = 1;
		}
		// 재승인요청
		else if ( "1".equals(decdSttsDcd) && "02".equals(decdStepDcd) ) {
			// 진행중, 재승인요청

			// 딜승인결재기본 입력
			IBIMS231BDTO dto231 = new IBIMS231BDTO();

			dto231.setDealNo(dealNo);
			dto231.setPrdtCd(prdtCd);
			dto231.setDecdJobDcd(scrnNo);
			dto231.setScrnNo(scrnNo);
			dto231.setExcSeq(excSeq);
			dto231.setTrSeq(trSeq);
			dto231.setRqstSq(rqstSq);

			int decdSn = ibims231bMapper.decdSn(dto231);

			dto231.setDecdSn(decdSn);
			dto231.setDecdStepDcd(decdStepDcd);
			dto231.setDecdSttsDcd(decdSttsDcd);
			dto231.setPrcsRsltDcd("00");
			dto231.setHndEmpno(facade.getDetails().getEno());
			ibims231bMapper.updateDecd(dto231);

			// 딜승인담당자 입력
			IBIMS232BDTO dto232 = new IBIMS232BDTO();
			dto232.setDecdSn(decdSn);
			dto232.setDecdSq(1);
			dto232.setDecdSttsDcd(decdSttsDcd);
			dto232.setRjctYn("N");
			dto232.setHndEmpno(facade.getDetails().getEno());
			ibims232bMapper.updateDecd(dto232);

			// 품의기본 입력
			IBIMS452BDTO dto452 = new IBIMS452BDTO();
			dto452.setPrdtCd(prdtCd);
			dto452.setExcSeq(excSeq);
			dto452.setTrSeq(trSeq);
			dto452.setErlmSeq(rqstSq);
			dto452.setHndEmpno(facade.getDetails().getEno());
			ibims452bMapper.insertFndsCnstDecd(dto452);

			result = 1;
		}
		// 결재요청취소
		else if ( "4".equals(decdSttsDcd) && "00".equals(decdStepDcd) ) {
			// 승인취소, 해당무

			// 딜승인결재기본 입력
			IBIMS231BDTO dto231 = new IBIMS231BDTO();

			dto231.setDealNo(dealNo);
			dto231.setPrdtCd(prdtCd);
			dto231.setDecdJobDcd(scrnNo);
			dto231.setScrnNo(scrnNo);
			dto231.setExcSeq(excSeq);
			dto231.setTrSeq(trSeq);
			dto231.setRqstSq(rqstSq);

			int decdSn = ibims231bMapper.decdSn(dto231);

			dto231.setDecdSn(decdSn);
			dto231.setDecdStepDcd(decdStepDcd);
			dto231.setDecdSttsDcd(decdSttsDcd);
			dto231.setPrcsRsltDcd("00");
			dto231.setHndEmpno(facade.getDetails().getEno());
			ibims231bMapper.updateDecd(dto231);

			// 딜승인담당자 입력
			IBIMS232BDTO dto232 = new IBIMS232BDTO();
			dto232.setDecdSn(decdSn);
			dto232.setDecdSq(1);
			dto232.setDecdSttsDcd(decdSttsDcd);
			dto232.setHndEmpno(facade.getDetails().getEno());
			ibims232bMapper.updateDecd(dto232);

			// 품의기본 입력
			IBIMS452BDTO dto452 = new IBIMS452BDTO();
			dto452.setPrdtCd(prdtCd);
			dto452.setExcSeq(excSeq);
			dto452.setTrSeq(trSeq);
			dto452.setErlmSeq(rqstSq);
			dto452.setRjctRsnCntn(rjctRsnCntn);
			dto452.setHndEmpno(facade.getDetails().getEno());
			ibims452bMapper.insertFndsCnstDecd(dto452);

			result = 1;
		}
		// 결재
		else if ( "2".equals(decdSttsDcd) && "05".equals(decdStepDcd) ) {
			// 승인, 결재완료

			// 딜승인결재기본 입력
			IBIMS231BDTO dto231 = new IBIMS231BDTO();

			dto231.setDealNo(dealNo);
			dto231.setPrdtCd(prdtCd);
			dto231.setDecdJobDcd(scrnNo);
			dto231.setScrnNo(scrnNo);
			dto231.setExcSeq(excSeq);
			dto231.setTrSeq(trSeq);
			dto231.setRqstSq(rqstSq);

			int decdSn = ibims231bMapper.decdSn(dto231);

			dto231.setDecdSn(decdSn);
			dto231.setDecdStepDcd(decdStepDcd);
			dto231.setDecdSttsDcd(decdSttsDcd);
			dto231.setPrcsRsltDcd("01");
			dto231.setHndEmpno(facade.getDetails().getEno());
			ibims231bMapper.updateDecd(dto231);

			// 딜승인담당자 입력
			IBIMS232BDTO dto232 = new IBIMS232BDTO();
			dto232.setDecdSn(decdSn);
			dto232.setDecdSq(1);
			dto232.setDecdSttsDcd(decdSttsDcd);
			dto232.setHndEmpno(facade.getDetails().getEno());
			ibims232bMapper.updateDecd(dto232);

			result = 1;
		}
		// 반려
		else if ( "3".equals(decdSttsDcd) && "00".equals(decdStepDcd) ) {
			// 반려, 해당무

			// 딜승인결재기본 입력
			IBIMS231BDTO dto231 = new IBIMS231BDTO();

			dto231.setDealNo(dealNo);
			dto231.setPrdtCd(prdtCd);
			dto231.setDecdJobDcd(scrnNo);
			dto231.setScrnNo(scrnNo);
			dto231.setExcSeq(excSeq);
			dto231.setTrSeq(trSeq);
			dto231.setRqstSq(rqstSq);

			int decdSn = ibims231bMapper.decdSn(dto231);

			dto231.setDecdSn(decdSn);
			dto231.setDecdStepDcd(decdStepDcd);
			dto231.setDecdSttsDcd(decdSttsDcd);
			dto231.setPrcsRsltDcd("02");
			dto231.setHndEmpno(facade.getDetails().getEno());
			ibims231bMapper.updateDecd(dto231);

			// 딜승인담당자 입력
			IBIMS232BDTO dto232 = new IBIMS232BDTO();
			dto232.setDecdSn(decdSn);
			dto232.setDecdSq(1);
			dto232.setDecdSttsDcd(decdSttsDcd);
			dto232.setRjctYn("Y");
			dto232.setHndEmpno(facade.getDetails().getEno());
			ibims232bMapper.updateDecd(dto232);

			// 품의기본 입력
			IBIMS452BDTO dto452 = new IBIMS452BDTO();
			dto452.setPrdtCd(prdtCd);
			dto452.setExcSeq(excSeq);
			dto452.setTrSeq(trSeq);
			dto452.setErlmSeq(rqstSq);
			dto452.setRjctRsnCntn(rjctRsnCntn);
			dto452.setHndEmpno(facade.getDetails().getEno());
			ibims452bMapper.insertFndsCnstDecd(dto452);

			result = 1;
		}
		else {
			result = -1;
		}

		return result;
	}
	
} // class end