using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;
using Prj_Ban_Quan_Ao.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Prj_Ban_Quan_Ao.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly DbQuanAoContext _context;

        public AccountsController(DbQuanAoContext context)
        {
            _context = context;
        }

        // GET: api/Accounts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Account>>> GetAccounts()
        {
            return await _context.Accounts.ToListAsync();
        }


        [HttpGet("getlistuserforadminsupport")]
        public IActionResult GetListUserForAdminSupport()
        {
            var query =
                        (from ac in _context.Accounts
                         where ac.VaiTro == false
                         select new
                         {
                             accountId = ac.Id,
                             tenDangNhap = ac.TenDangNhap,
                             tenHienThi = ac.TenHienThi,
                             duongDanAnh = ac.DuongDanAnh,
                             tinNhanGanNhat = (
                             from cb in _context.ChatBoxes
                             where cb.AccountId == ac.Id
                             orderby cb.NgayTao descending
                             select cb.NoiDung
                             ).FirstOrDefault()
                         }).OrderByDescending(x => x.tinNhanGanNhat).ToList();
            
            return Ok(query);
        }


        // GET: api/Accounts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccount(Guid id)
        {
            var account = await _context.Accounts.FindAsync(id);

            if (account == null)
            {
                return NotFound();
            }

            return account;
        }

        // PUT: api/Accounts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccount(Guid id, Account account)
        {
            if (id != account.Id)
            {
                return BadRequest();
            }

            _context.Entry(account).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Accounts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Account>> PostAccount(Account account)
        {
            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAccount", new { id = account.Id, status = "success" }, account);
        }

        // DELETE: api/Accounts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(Guid id)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("checkdangnhap")]
        public IActionResult checkDangNhap(string tendangnhap, string matkhau)
        {
            var query =
                        (from ac in _context.Accounts
                         where ac.TenDangNhap == tendangnhap &&
                                ac.MatKhau == matkhau
                         select ac);
            if (query.Any())
            {
                return Ok(new { status = "success", message = "Đăng nhập thành công.", accounts = query.FirstOrDefault() });
            }
            return Ok(new { status = "error", message = "Tên đăng nhập hoặc mật khẩu không đúng.", tendang = tendangnhap, matkhau = matkhau});
        }

        [HttpGet("checkusername/{tenDangNhap}")]
        public bool AccountExistsUserName(string tenDangNhap)
        {
            return _context.Accounts.Any(e => e.TenDangNhap == tenDangNhap);
        }

        [HttpGet("guiemail/{emailNguoiDung}/{code}")]
        public Task GuiEmail(string emailNguoiDung,string code)
        {
            string subject = "Xác nhận đăng ký tài khoản Fashion Store";
            string message = $"Xin chào, {emailNguoiDung} \n \n Cảm ơn bạn đã lựa chọn và tin tưởng cửa hàng của chúng tôi \n Vui lòng nhập đoạn code sau đây để hoàn tất đăng ký. Lưu ý không cung cấp đoạn code cho bất kì ai! \n Code: {code}";
            var mail = "<account microsoft>";
            var pw = "<password microsoft>";
            var client = new SmtpClient("smtp-mail.outlook.com")
            {
                Port = 587,
                EnableSsl = true,
                Credentials = new NetworkCredential(mail, pw)
            };
            return client.SendMailAsync(
                new MailMessage(
                   from: mail,
                   to: emailNguoiDung,
                   subject,
                   message
                ));
        }


        private bool AccountExists(Guid id)
        {
            return _context.Accounts.Any(e => e.Id == id);
        }


    }
}
