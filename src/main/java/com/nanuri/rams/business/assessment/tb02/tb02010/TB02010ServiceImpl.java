package com.nanuri.rams.business.assessment.tb02.tb02010;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS100BDTO;
import com.nanuri.rams.business.common.dto.IBIMS231BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS003BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS100BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS231BMapper;
import com.nanuri.rams.business.common.mapper.WorkFlowMapper;
import com.nanuri.rams.business.common.vo.IBIMS100BVO;
import com.nanuri.rams.business.common.vo.TB02010SVO;
import com.nanuri.rams.business.common.vo.IBIMS100BVO.selectVO;
import com.nanuri.rams.business.common.vo.IBIMS231BVO;
import com.nanuri.rams.com.WF.WorkFlow;
import com.nanuri.rams.com.dto.WorkFlowDTO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB02010ServiceImpl implements TB02010Service {

	private final IBIMS100BMapper ibims100BMapper;

	private final IBIMS003BMapper ibims003bMapper;

	private final IBIMS231BMapper ibims231bMapper;

	private final WorkFlowMapper workFlowMapper;

	private final AuthenticationFacade facade;

	@Override
	public int getSeqNo(IBIMS100BDTO getSeq) {
		return ibims100BMapper.getSeqNo(getSeq);
	}

	@Override
	public List<IBIMS100BVO> getSummaryInfo(IBIMS100BVO getSummary) {
		return ibims100BMapper.getSummaryInfo(getSummary);
	}

	@Override
	public List<IBIMS100BVO.selectVO> selectIBIMS100BInfo(selectVO selInfo) {

		Map<String, Object> rmrkMap = null;

		selInfo.setEmpno(facade.getDetails().getEno());

		List<IBIMS100BVO.selectVO> result = ibims100BMapper.selectIBIMS100BInfo(selInfo);

		if(result.size() > 0) {
			for(int i = 0 ; result.size() > i ; i ++) {

				String rmrk = result.get(i).getRmrk();

				String [] rmrkSpilt = rmrk.split(",");

				rmrkMap = new HashMap<String, Object>();

				for (int j = 0; rmrkSpilt.length > j; j++) {
					int index = rmrkSpilt[j].indexOf("=");
						// 임시로 에러 막음 RMRK = TEST 일시 index -1로 떨어지면서 에러
						if (index > 0){
							String tempKey = rmrkSpilt[j].substring(0, index);
							String tempValue = rmrkSpilt[j].substring(index + 1);
							rmrkMap.put(tempKey, tempValue);
						}
				}
				result.get(i).setRmrkMap(rmrkMap);
			}
		}

		return result;
	}

	@Override
	public int insertIBIMS100BInfo(IBIMS100BDTO insertInfo) {
		return ibims100BMapper.insertIBIMS100BInfo(insertInfo);
	}

	@Override
	public int updateIBIMS100BInfO(IBIMS100BDTO updateInfO) {
		return ibims100BMapper.updateIBIMS100BInfO(updateInfO);
	}

	@Override
	public int deleteIBIMS100BInfo(IBIMS100BDTO deleteInfo) {
		return ibims100BMapper.deleteIBIMS100BInfo(deleteInfo);
	}

	//오늘의 할일(워크플로우) 조회
	@Override
	public TB02010SVO workFlowInq(WorkFlowDTO param){

		WorkFlowDTO paramDto = new WorkFlowDTO();
		String empno = param.getEmpno();
		String athCd = ibims003bMapper.atcCdInq(empno);

		paramDto.setWfAuthId(athCd);

		List<WorkFlowDTO> workFlowList = workFlowMapper.workFlowInq(paramDto);		//WF 리스트
		List<WorkFlowDTO> wfCntList = workFlowMapper.wfCntInq(paramDto);			//WF 건수 리스트

		TB02010SVO rsltVO = new TB02010SVO();

		rsltVO.setWfCntList(wfCntList);
		rsltVO.setWorkFlowList(workFlowList);

		return rsltVO;
	}

	// 오늘의 할일 2025-02-03 김건우
	@Override
	public List<IBIMS231BVO> myJob() {
		return ibims231bMapper.todayWorks(facade.getDetails().getEno());
	}

	/**
     * 일하러가는 화면명과 조회 키값
     */
	@Override
	public IBIMS231BDTO justWork ( IBIMS231BDTO param ) {
		log.debug("int decdSn::::::::::::::" + param.getDecdSn());
		return ibims231bMapper.justWork( param );
	}

}
