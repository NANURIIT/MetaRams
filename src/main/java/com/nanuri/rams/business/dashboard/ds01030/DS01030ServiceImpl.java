package com.nanuri.rams.business.dashboard.ds01030;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.RAA02BMapper;
import com.nanuri.rams.business.common.mapper.RAA91BMapper;
import com.nanuri.rams.business.common.vo.DS01030SVO.Parameters;
import com.nanuri.rams.com.code.GroupCd;
import com.nanuri.rams.com.utils.CodeUtil;
import com.nanuri.rams.com.utils.DateUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class DS01030ServiceImpl implements DS01030Service {
	
	// private final DS01030Mapper ds01030Mapper;
	
	private final RAA02BMapper raa02bMapper;
	private final RAA91BMapper raa91bMapper;
	
	@Override
	public List<Parameters> getData(Parameters param) {
		
		// 코드명 변환용
		List<Map<String, Object>> selectBoxList = raa91bMapper.getSelectBox(null);
		
		param.setStart(DateUtil.changeDateFormat(param.getStart(), "yyyyMMdd"));
		param.setEnd(DateUtil.changeDateFormat(param.getEnd(), "yyyyMMdd"));
		
		List<Parameters> result = raa02bMapper.getData(param);
		
		if (result.size() > 0) {
			for (int i = 0; result.size() > i; i++) {
				
				result.get(i).setStdYr(DateUtil.changeDateFormat(result.get(i).getStdYr(), "yyyy-MM-dd"));
				result.get(i).setStart(DateUtil.changeDateFormat(result.get(i).getStart(), "yyyy-MM-dd"));
				result.get(i).setEnd(DateUtil.changeDateFormat(result.get(i).getEnd(), "yyyy-MM-dd"));
				
				result.get(i).setInspctDprtCcd(CodeUtil.codeToCodeName(result.get(i).getInspctDprtCcd(), selectBoxList, GroupCd.INSPCT_DPRT_CCD.getCode()));
				
			}
		}
		
		return result;
	}

}
