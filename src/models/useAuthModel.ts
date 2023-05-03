import { useState, useCallback } from 'react';
import { request, history } from 'umi';

interface UserInfoType {
  name: string, // 名字
  userId: string, // 用户名/学号
  birthday: string, // 生日
  sex: number, // 性别，男 1 女 0
  major: string, // 专业
  college: string, // 学院
  alumniAssociationId: string, // 对应校友会的 id
  phone: string, // 电话号码
  address: string, // 联系地址
  employer: string, // 就业单位
  job: string, // 职业
  email: string, // 邮箱
  isManager: number, // 是否管理员：普通：0 校友会管理员：1 学校管理员：2
  isTutor: number, // 是否担任导师
  createTime: string; // 创建时间
  password: string; // 密码
}

export default function useAuthModel() {
  const [user, setUser] = useState<UserInfoType | null>(null);



  const signout = useCallback(() => {
    setUser(null);
    history.replace('/login');
    localStorage.removeItem('role');
  }, [])

  return {
    user,
    setUser,
    signout
  }
}
