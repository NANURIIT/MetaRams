package com.nanuri.rams.business.assessment.as03.as03110;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.RAA02BMapper;
import com.nanuri.rams.business.common.vo.RAA02BVO.AssignInfo;
import com.nanuri.rams.com.utils.DateUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AS03110ServiceImpl implements AS03110Service {

	private final RAA02BMapper raa02bMapper;

	// 배정안건조회
	@Override
	public List<AssignInfo> assignmentSearch(AssignInfo dealInfo) {
		dealInfo.setStart(DateUtil.changeDateFormat(dealInfo.getStart(), "yyyy-MM-dd"));
		dealInfo.setEnd(DateUtil.changeDateFormat(dealInfo.getEnd(), "yyyy-MM-dd"));

		return raa02bMapper.assignmentSearch(dealInfo);
	}

}
