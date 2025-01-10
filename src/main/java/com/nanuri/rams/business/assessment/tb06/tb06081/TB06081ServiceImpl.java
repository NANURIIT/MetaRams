package com.nanuri.rams.business.assessment.tb06.tb06081;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS003BDTO;
import com.nanuri.rams.business.common.dto.IBIMS231BDTO;
import com.nanuri.rams.business.common.dto.IBIMS232BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS003BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS231BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS232BMapper;
import com.nanuri.rams.business.common.vo.IBIMS003BVO;
import com.nanuri.rams.business.common.vo.IBIMS231BVO;
import com.nanuri.rams.business.common.vo.TB06080SVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB06081ServiceImpl implements TB06081Service {

	private final AuthenticationFacade facade;

	private final IBIMS003BMapper ibims003bMapper;
	private final IBIMS231BMapper ibims231bMapper;
	private final IBIMS232BMapper ibims232bMapper;

	@Override
	public List<IBIMS003BVO> srchApvlList(IBIMS003BVO paramData){

		paramData.setNowEmpno(facade.getDetails().getEno());

		return	ibims003bMapper.srchApvlList(paramData);
	}

	@Override
	public List<IBIMS003BVO> apvlListChk(IBIMS231BDTO paramData) {
		return ibims231bMapper.apvlListChk(paramData);
	}

	@Override
	public int apvlRqst(IBIMS231BVO paramData) {

		int result = 0;

		List<IBIMS231BDTO> apvlList = paramData.getApvlList();

		int decdSn = ibims231bMapper.getDecdSn();
		String apvlRqstPEno = facade.getDetails().getEno();

		for(int i = apvlList.size() - 1; i >= 0; i--){
			if( i == apvlList.size() - 1){
				/* IBIMS231B data */

				// 일련번호
				apvlList.get(i).setDecdSn(decdSn);
				// 최종결재순번
				apvlList.get(i).setLastDecdSq(apvlList.size());
				// 승인요청자사번
				apvlList.get(i).setApvlRqstPEno(apvlRqstPEno);
				// 마지막처리사원
				apvlList.get(i).setHndEmpno(apvlRqstPEno);
	
				ibims231bMapper.apvlRqst(apvlList.get(i));
			}

			/* IBIMS232B data */
			IBIMS232BDTO ibims232bdto = new IBIMS232BDTO();
			
			// 결재일련번호
			ibims232bdto.setDecdSn(decdSn);
			// 결재순번
			ibims232bdto.setDecdSq( i + 1 );
			// 결재상태구분코드
			ibims232bdto.setDecdSttsDcd( apvlList.get(i).getDecdSttsDcd() );
			// 결재자사번
			ibims232bdto.setDcfcEno( apvlList.get(i).getChrrEno() );
			// 조작사원번호
			ibims232bdto.setHndEmpno(apvlRqstPEno);

			ibims232bMapper.apvlRqst(ibims232bdto);

			result += 1;
		}

		return result;
	}

	@Override
	public int cancelApvlRqst(IBIMS231BVO paramData) {

		int result = 0;

		List<IBIMS231BDTO> apvlList = paramData.getApvlList();
		String hndEmpno = facade.getDetails().getEno();
		int decdSn = ibims231bMapper.decdSn(apvlList.get(0));
		
		for(int i = apvlList.size() - 1; i >= 0; i--){
			// 마지막처리사원
			apvlList.get(i).setHndEmpno(hndEmpno);
			
			if(i == 0){
				ibims231bMapper.updateDecd(apvlList.get(i));
			}

			IBIMS232BDTO updateData = new IBIMS232BDTO();

			// 결재일련번호 set
			// 결재순번
			// 결재상태구분코드 set
			// 결재자사번
			// 결재일시
			// 결재자주석내용
			// 반려여부
			// 반려사유내용
			// 조작상세일시 ~ GUID
			updateData.setDecdSn(decdSn);
			updateData.setDecdSttsDcd(apvlList.get(i).getDecdSttsDcd());
			updateData.setHndEmpno(apvlList.get(i).getHndEmpno());
			ibims232bMapper.updateDecd(updateData);
			
			result += 1;
		}
		

		return result;
	}

}
