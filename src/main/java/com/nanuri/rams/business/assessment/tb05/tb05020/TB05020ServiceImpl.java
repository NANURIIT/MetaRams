package com.nanuri.rams.business.assessment.tb05.tb05020;

import com.nanuri.rams.business.common.dto.IBIMS115BDTO;
import com.nanuri.rams.business.common.dto.RAA23BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS115BMapper;
import com.nanuri.rams.business.common.mapper.RAA23BMapper;
import com.nanuri.rams.business.common.vo.AS04210SVO.SearchVO;
import com.nanuri.rams.business.common.vo.AS04220SVO.DealInfo;
import com.nanuri.rams.business.common.vo.TB05020SVO;
import com.nanuri.rams.com.security.AuthenticationFacade;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB05020ServiceImpl implements TB05020Service {

	private final RAA23BMapper raa23bMapper;
	private final IBIMS115BMapper ibims115BMapper;

	private final AuthenticationFacade facade;


	@Override
	public List<TB05020SVO> getDealInfoByEno(String chkF) {
		Map<String, String> paramData = new HashMap<>();
		paramData.put("chkF", chkF);
		paramData.put("eno", facade.getDetails().getEno());

		return ibims115BMapper.getDealInfoByEno(paramData);
	}

	@Override
	public int confirmFile(RAA23BDTO param) {
		String eno = facade.getDetails().getEno();

		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat sdf2 = new SimpleDateFormat("HHmmss");
		Date now = new Date();
		String timeDt = sdf1.format(now);
		String timeTm = sdf2.format(now);

		param.setAtdncPEno(facade.getDetails().getEno());

		param = raa23bMapper.selectRAA23BInfo(param);

		param.setCnfrPEno(eno);
		param.setCnfrF("Y");
		param.setCnfrDt(timeDt);
		param.setCnfrTm(timeTm);
		param.setHndlDprtCd(facade.getDetails().getDprtCd());
		param.setHndlPEno(eno);

		return raa23bMapper.updateRAA23BInfo(param);
	}

	@Override
	public int updateAprvOppsDcd(IBIMS115BDTO paramData) {
		paramData.setOpnnRgstEmpno(facade.getDetails().getEno());
		return ibims115BMapper.updateAprvOppsDcd(paramData);
	}

}
